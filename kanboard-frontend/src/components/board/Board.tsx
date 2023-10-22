import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories, selectStatus, updateKanboardState} from "../../slices/kanboard/kanboardSlice";
import styled from "styled-components";
import {InfinitySpin} from "react-loader-spinner";
import {Category} from "../../app/types";
import {CategoryComponent } from "../category/CategoryComponent";
import {NewTaskDialog} from "../dialogs/newTaskDialog/newTaskDialog";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  padding-top: 10px;
  justify-content: center;
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;
`
const CategoriesWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-grow: 1;
  flex-direction: row;
`

export function Board(){
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(updateKanboardState())
    }, []);

    return (
        <VerticalWrapper>
            <TitleWrapper>
                <Title>Kanboard</Title>
            </TitleWrapper>
            {status === "idle"
                ? (
                    <div>
                        <CategoriesWrapper>
                        {categories.map((c: Category) => (
                            <CategoryComponent category={c}/>
                        ))}
                        </CategoriesWrapper>
                        <NewTaskDialog/>
                    </div>
                )
                :(
                    <LoaderContainer>
                        <InfinitySpin  width='200' color="#4fa94d"/>
                    </LoaderContainer>
                )}
        </VerticalWrapper>
    );
}