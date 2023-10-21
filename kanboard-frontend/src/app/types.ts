export interface Category{
    name: string;
}

export interface TaskDTO{
    title: string
    description: string;
    category: string;
    color: string;
}

export interface Task{
    title: string;
    description: string;
    category: Category;
    color: string;
}