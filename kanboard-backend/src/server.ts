import express, {Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app : Express = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  { name: 'Personal' },
  { name: 'Work' },
  { name: 'Shopping' },
];

//ChatGPT generated example data
const tasks: Task[] = [
  {
    title: 'Buy Groceries',
    description: 'Buy apples, bananas, and bread at the store.',
    category: 'Shopping',
    color: '#FFDD88', // Light yellow
  },
  {
    title: 'Project Presentation',
    description: 'Prepare slides and rehearse for the project presentation.',
    category: 'Work',
    color: '#88FF88', // Light green
  },
  {
    title: 'Exercise',
    description: 'Go for a 30-minute jog in the park.',
    category: 'Personal',
    color: '#FF8888', // Light red
  },
  {
    title: 'Plan Vacation',
    description: 'Research and plan a summer vacation destination.',
    category: 'Personal',
    color: '#FFBB88', // Light orange
  },
  {
    title: 'Finish Report',
    description: 'Complete the monthly sales report for the team.',
    category: 'Work',
    color: '#88DDFF', // Light blue
  },
  {
    title: 'Buy Milk',
    description: "Don't forget to buy a carton of milk.",
    category: 'Shopping',
    color: '#FFDD88', // Light yellow
  },
  {
    title: 'Task Assignment',
    description: 'Assign tasks to team members for the project.',
    category: 'Work',
    color: '#88FF88', // Light green
  },
  {
    title: 'Buy Bread',
    description: 'Pick up a loaf of your favorite bread.',
    category: 'Shopping',
    color: '#FFDD88', // Light yellow
  },
  {
    title: 'Workshop Preparation',
    description: 'Gather materials for the upcoming workshop.',
    category: 'Work',
    color: '#88FF88', // Light green
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
