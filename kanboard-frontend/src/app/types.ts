export interface Category{
    id: number;
    name: string;
}

export interface TaskDTO{
    id: number
    title: string
    description: string;
    category: string;
    color: string;
}

export interface Task{
    id: number;
    title: string;
    description: string;
    category: Category;
    color: string;
}