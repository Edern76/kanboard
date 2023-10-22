import {TaskDTO} from "../../app/types";
import axios from "axios";

export async function fetchTasks() : Promise<TaskDTO[]>{
    const {data, status} = await axios.get<TaskDTO[]>(
        "http://localhost:3000/tasks",
        {
            headers:{
                Accept: 'application/json'
            }
        }
    )
    return data;
}

export async function updateTask(task : TaskDTO) : Promise<void>{
    const {status} = await axios.put(
        "http://localhost:3000/tasks",
        task
    )
}