import React from "react";
import styled from "styled-components";
import {Category} from "../../app/types";
import {useHover, usePress} from "react-aria";
import {useAppDispatch} from "../../app/hooks";
import {openNewTaskModal} from "../../slices/kanboard/kanboardSlice";


interface TaskAdderWrapperProps{
    hovered: boolean;
}
const TaskAdderWrapper = styled.div<TaskAdderWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13rem;
  height: 13rem;
  aspect-ratio: 1/1;
  margin: 20px;
  border-radius: 5px;
  color: ${props => props.hovered ? "deepskyblue" : "grey"};
  border: 3px dashed ${props => props.hovered ? "deepskyblue" : "grey" };
  cursor: pointer;
`

const TaskAdderSymbol = styled.p`
  font-size: 100pt;
  line-height: 1;
  padding-bottom: 27px;
`

export function TaskAdder(props : {category:Category}){
    const dispatch = useAppDispatch();
    const { hoverProps, isHovered } = useHover({});
    const {pressProps, isPressed} = usePress({
        onPressEnd : (e) => {
            dispatch(openNewTaskModal(props.category));
        }
    })
    return (
        <TaskAdderWrapper {...hoverProps} {...pressProps} hovered={isHovered}>
            <TaskAdderSymbol>+</TaskAdderSymbol>
        </TaskAdderWrapper>
    )
}