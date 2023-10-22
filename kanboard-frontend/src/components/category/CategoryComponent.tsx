import React, {useRef} from "react";
import {Category, Task} from "../../app/types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTasksByCategories, updateTaskThunk} from "../../slices/kanboard/kanboardSlice";
import styled from "styled-components";
import {TitleWrapper} from "../helpers/TitleWrapper";
import {TaskComponent} from "../task/TaskComponent";
import {DropZone} from 'react-aria-components';
import {TextDropItem, useDrop} from "react-aria";
import {TaskAdder} from "../taskAdder/TaskAdder";

const CategoryTitle = styled.h2`
`
interface CategoryWrapperProps{
    dropping : boolean;
}

const CategoryWrapper = styled.div<CategoryWrapperProps>`
  display: flex;
  flex-basis: 0;
  min-width: 0;
  flex-direction: column;
  flex-grow: 1;
  border-left: 1px solid black;
  border-right: 1px solid black;
  background-color: ${props => props.dropping ? "lightblue" : "white"};
`

const TasksWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

export function CategoryComponent(props : {category: Category}){
    const dispatch = useAppDispatch();
    let ref = useRef(null);

    const tasks : Task[] = useAppSelector(state => selectTasksByCategories(state, props.category));

    const {dropProps, isDropTarget} = useDrop({
        ref,
        getDropOperation(types, allowedOperations){
            return types.has("application/task") ? "copy" : "cancel";
        },
        async onDrop(e){
            const item = e.items.find((item) => item.kind == "text") as TextDropItem;
            const task = JSON.parse(await item.getText("application/task")) as Task;
            task.category = props.category;
            dispatch(updateTaskThunk(task));
        }
    })

    return (
        <CategoryWrapper {...dropProps} tabIndex={0} ref={ref} dropping={!!isDropTarget}>
            <TitleWrapper>
                <CategoryTitle>{props.category.name}</CategoryTitle>
            </TitleWrapper>
            <TasksWrapper>
                {tasks.map((task:Task) =>(
                    <TaskComponent task={task}/>
                ))}
                <TaskAdder category={props.category}/>
            </TasksWrapper>
        </CategoryWrapper>
    )

}