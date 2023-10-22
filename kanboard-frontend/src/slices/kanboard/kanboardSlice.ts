import {Category, Task, TaskDTO} from "../../app/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "../../apis/category/categoryAPI";
import {createTask, fetchTasks, updateTask} from "../../apis/task/taskAPI";
import {RootState} from "../../app/store";
import _ from "lodash";

export interface KanboardState{
    tasks: Task[];
    categories: Category[];
    addTaskModalCategory: Category | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState:KanboardState = {
    tasks: [] as Task[],
    categories: [] as Category[],
    addTaskModalCategory: undefined,
    status: 'idle'
}

export const updateKanboardState = createAsyncThunk(
    'board/fetchState',
    async () => {
        try{
            const newState = structuredClone(initialState) as KanboardState;
            const [categories, tasksDTO] = await Promise.all([fetchCategories(), fetchTasks()]);
            newState.tasks = tasksDTOToTasks(categories, tasksDTO)
            newState.categories = categories
            return newState
        }
        catch (error){
            console.error(error)
            throw error;
        }
    }
)

export const updateTaskThunk = createAsyncThunk(
    'board/updateTask',
    async (task:Task, {dispatch}) => {
        await updateTask(taskToDto(task));
        dispatch(updateKanboardState());
        return true;
    }
)

export const createTaskThunk = createAsyncThunk(
    'board/createTask',
    async (task:TaskDTO, {dispatch}) => {
        await createTask(task);
        dispatch(updateKanboardState());
        dispatch(closeNewTaskModal());
        return true;
    }

)

export const kanboardSlice = createSlice({
    name: 'kanboard',
    initialState,
    reducers: {
        openNewTaskModal: (state, action) => {
            const category = action.payload as Category;
            state.addTaskModalCategory = category;
        },
        closeNewTaskModal : (state) => {
            state.addTaskModalCategory = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                updateKanboardState.pending, (state) => {
                    state.status = 'loading';
                }
            )
            .addCase(
                updateKanboardState.fulfilled, (state, action) => {
                    const newState = action.payload as KanboardState;
                    state.tasks = newState.tasks
                    state.categories = newState.categories;
                    state.status = 'idle';
                }
            )
            .addCase(
                updateKanboardState.rejected, (state, action) => {
                    state.status = 'failed';
                }
            )
    }
})

export const {openNewTaskModal, closeNewTaskModal} = kanboardSlice.actions;

export const selectCategories = (state:RootState) => {return state.kanboard.categories};
export const selectTasksByCategories = (state:RootState, category:Category) => {
    return state.kanboard.tasks.filter((task:Task) => _.isEqual(category, task.category));
}
export const selectStatus = (state:RootState) => { return state.kanboard.status};
export const selectNewTaskModalCategory = (state:RootState) => {return state.kanboard.addTaskModalCategory};

const tasksDTOToTasks = (categories: Category[], dtos: TaskDTO[]) : Task[] => {
    const result : Task[] = [];
    dtos.forEach((value:TaskDTO) => {
      const category = categories.find((cat:Category) => cat.id === value.category);
      if (category === undefined) {throw new Error(`No category found with the ID ${value.id}`)}
      if (value.id === undefined) {throw new Error(`No ID found for task named ${value.title}`)}
      result.push({
          id: value.id,
          title: value.title,
          category: category,
          color: value.color,
          description: value.description
      } as Task)
    });
    return result
}

const taskToDto = (task : Task) : TaskDTO =>{
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        color: task.color,
        category: task.category.id
    } as TaskDTO;
}

export default kanboardSlice.reducer