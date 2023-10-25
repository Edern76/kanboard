import React, {memo} from "react";
import {Task} from "../../app/types";
import styled from "styled-components";
import {TitleWrapper} from "../helpers/TitleWrapper";
import {useDrag} from "react-aria";

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  min-height: 13rem;
  box-shadow :1px 1px 10px black;
  aspect-ratio: 1/1;
  background-color: ${props => props.color};
  margin: 20px;
  border-radius: 5px;
  border: 1px solid black;
`

const TaskTitle = styled.h3``

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 10px;
`

const Description = styled.p`
  text-align: center;
`

export const TaskComponent = React.memo(function TaskComponent(props : {task: Task}){
    const {dragProps, isDragging} = useDrag({
        getItems(){
            return [{
                'application/task' : JSON.stringify(props.task)
            }]
        }
    });

    return (
        <TaskWrapper {...dragProps} tabIndex={0} color={props.task.color}>
            <TitleWrapper>
                <TaskTitle>{props.task.title}</TaskTitle>
            </TitleWrapper>
            <DescriptionWrapper>
                <Description>{props.task.description}</Description>
            </DescriptionWrapper>
        </TaskWrapper>
    )
})