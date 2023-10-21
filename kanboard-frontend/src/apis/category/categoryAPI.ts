import axios from "axios";
import {Category} from "../../app/types";


export async function fetchCategories() : Promise<Category[]>{
    const {data, status} = await axios<Category[]>({
        method: "get",
        url:"http://localhost:3000/categories",
        withCredentials: false
    });
    return data;
}