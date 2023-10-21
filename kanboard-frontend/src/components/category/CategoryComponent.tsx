import React from "react";
import {Category, Task} from "../../app/types";
import {useAppSelector} from "../../app/hooks";
import {selectTasksByCategories} from "../../slices/kanboard/kanboardSlice";
import styled from "styled-components";
import {TitleWrapper} from "../helpers/TitleWrapper";
import {TaskComponent} from "../task/TaskComponent";

const CategoryTitle = styled.h2`
`



const CategoryWrapper = styled.div`
  display: flex;
  flex-basis: 0;
  min-width: 0;
  flex-direction: column;
  flex-grow: 1;
  border-left: 1px solid black;
  border-right: 1px solid black;
`

const TasksWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

export function CategoryComponent(props : {category: Category}){
    const tasks : Task[] = useAppSelector(state => selectTasksByCategories(state, props.category));

    return (
        <CategoryWrapper>
            <TitleWrapper>
                <CategoryTitle>{props.category.name}</CategoryTitle>
            </TitleWrapper>
            <TasksWrapper>
                {tasks.map((task:Task) =>(
                    <TaskComponent task={task}/>
                ))}
            </TasksWrapper>
        </CategoryWrapper>
    )

}