import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    closeNewTaskModal,
    createTaskThunk,
    selectCategories,
    selectNewTaskModalCategory
} from "../../../slices/kanboard/kanboardSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Category, Task, TaskDTO} from "../../../app/types";
import styled from "styled-components";
import {MuiColorInput} from "mui-color-input";

const SyledDialogContents = styled(DialogContent)`
  display: flex;
  flex-direction: column;
`

const StyledSelect = styled(Select)`
  margin-top: 10px;
  margin-bottom: 10px;
`

export function NewTaskDialog(){
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories)
    const defaultCategory = useAppSelector(selectNewTaskModalCategory)

    const generateDefaultTask = (category:Category|undefined) => {
        return {
            id: undefined,
            title: "",
            description: "",
            color: "#ffffff",
            category: category != undefined ? category!.id : -1,
        } as TaskDTO;
    }

    let task = useRef(generateDefaultTask(defaultCategory)) //We don't want to rerender on each user input in the text fields plus ref instead of state makes task mutable
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [color, setColor] = useState("#ffffff")

    useEffect(() => {
        task.current = generateDefaultTask(defaultCategory);
        setSelectedCategory(task.current.category);
    }, [defaultCategory]);

    const handleClose = () => {
        dispatch(closeNewTaskModal())
    }

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        task.current.title = e.target.value;
    }

    const handleDescriptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        task.current.description = e.target.value;
    }

    const handleCategoryChange = (e:SelectChangeEvent) => {
        const categoryId = parseInt(e.target.value);
        setSelectedCategory(categoryId);
        task.current.category = parseInt(e.target.value);
    }

    const handleColorChange = (color:string) => {
        setColor(color);
        task.current.color = color;
    }

    return (
        <Dialog open={defaultCategory !== undefined} onClose={handleClose}>
            <DialogTitle>Add new task</DialogTitle>
            <SyledDialogContents>
                <TextField label="Title" onChange={handleTitleChange} variant="standard"/>
                <TextField label="Description" onChange={handleDescriptionChange} variant="standard"/>
                <StyledSelect value={selectedCategory.toString()} label="Category" onChange={handleCategoryChange} variant="standard" >
                    {categories.map((c:Category) => (
                        <MenuItem value={c.id}>{c.name}</MenuItem>
                    ))}
                </StyledSelect>
                <MuiColorInput value={color} onChange={handleColorChange} format="hex"/>
            </SyledDialogContents>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={() => {dispatch(createTaskThunk(task.current))}}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}