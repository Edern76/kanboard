import {Category, Task, TaskDTO} from "../../app/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "../../apis/category/categoryAPI";
import {fetchTasks} from "../../apis/task/taskAPI";
import {RootState} from "../../app/store";
import _ from "lodash";

export interface KanboardState{
    tasks: Task[];
    categories: Category[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState:KanboardState = {
    tasks: [] as Task[],
    categories: [] as Category[],
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

export const kanboardSlice = createSlice({
    name: 'kanboard',
    initialState,
    reducers: {},
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

export const selectCategories = (state:RootState) => {return state.kanboard.categories}
export const selectTasksByCategories = (state:RootState, category:Category) => {
    return state.kanboard.tasks.filter((task:Task) => _.isEqual(category, task.category))
}
export const selectStatus = (state:RootState) => { return state.kanboard.status}

const tasksDTOToTasks = (categories: Category[], dtos: TaskDTO[]) : Task[] => {
    const result : Task[] = [];
    dtos.forEach((value:TaskDTO) => {
      const category = categories.find((cat:Category) => cat.name === value.category);
      if (category == undefined) {throw new Error(`No category found with the name ${value.category}`)}
      result.push({
          title: value.title,
          category: category,
          color: value.color,
          description: value.description
      } as Task)
    });
    return result
}

export default kanboardSlice.reducer