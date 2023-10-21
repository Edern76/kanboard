import express, {Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app : Express = express();
app.use(bodyParser.json());

interface Category {
  name: string;
}

interface Task {
  title: string;
  description: string;
  category: string;
  color: string;
}

const categories: Category[] = [
  { name: 'Category 1' },
  { name: 'Category 2' },
];

const tasks: Task[] = [
  {
    title: 'Task 1',
    description: 'Description for Task 1',
    category: 'Category 1',
    color: '#FF5733',
  },
  {
    title: 'Task 2',
    description: 'Description for Task 2',
    category: 'Category 2',
    color: '#3366FF',
  },
];

// Get a list of categories
app.get('/categories', (req: Request, res: Response) => {
  res.json(categories);
});

// Get a list of tasks
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Add a new category
app.post('/categories', (req: Request, res: Response) => {
  const { name } = req.body as Category;
  if (!name) {
    return res.status(400).json({ error: 'Name is required for a category' });
  }

  categories.push({ name });
  res.status(201).json({ message: 'Category added successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
