export interface Category{
    id: number;
    name: string;
}

export interface TaskDTO{
    id: number | undefined;
    title: string
    description: string;
    category: number;
    color: string;
}

export interface Task{
    id: number;
    title: string;
    description: string;
    category: Category;
    color: string;
}