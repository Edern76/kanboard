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