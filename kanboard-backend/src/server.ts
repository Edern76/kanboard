import express, {Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';

const app : Express = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  	next();
});

interface Category {
  	id: number;
  	name: string;
}

interface Task {
  	id: number;
  	title: string;
  	description: string;
  	category: number;
  	color: string;
}

const categories: Category[] = [
  	{ id:0, name: 'Personal' },
  	{ id:1, name: 'Work' },
  	{ id:2, name: 'Shopping' },

];

//ChatGPT generated example data
let tasks: Task[] = [
	{
		id:0,
		title: 'Buy Groceries',
		description: 'Buy apples, bananas, and bread at the store.',
		category: 2,
		color: '#FFDD88', // Light yellow
	},
	{
		id:1,
		title: 'Project Presentation',
		description: 'Prepare slides and rehearse for the project presentation.',
		category: 1,
		color: '#88FF88', // Light green
	},
	{
		id:2,
		title: 'Exercise',
		description: 'Go for a 30-minute jog in the park.',
		category: 0,
		color: '#FF8888', // Light red
	},
	{
		id:3,
		title: 'Plan Vacation',
		description: 'Research and plan a summer vacation destination.',
		category: 0,
		color: '#FFBB88', // Light orange
	},
	{
		id:4,
		title: 'Finish Report',
		description: 'Complete the monthly sales report for the team.',
		category: 1,
		color: '#88DDFF', // Light blue
	},
	{
		id:5,
		title: 'Buy Milk',
		description: "Don't forget to buy a carton of milk.",
		category: 2,
		color: '#FFDD88', // Light yellow
	},
	{
		id:6,
		title: 'Task Assignment',
		description: 'Assign tasks to team members for the project.',
		category: 1,
		color: '#88FF88', // Light green
	},
	{
		id:7,
		title: 'Buy Bread',
		description: 'Pick up a loaf of your favorite bread.',
		category: 2,
		color: '#FFDD88', // Light yellow
	},
	{
		id:8,
		title: 'Workshop Preparation',
		description: 'Gather materials for the upcoming workshop.',
		category: 1,
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

// Update a task
app.put('/tasks', (req: Request, res: Response) => {
	const updatedTask = req.body as Task;
	const taskToUpdate = tasks.find((t:Task) => t.id === updatedTask.id)
	if (!taskToUpdate){
		return res.status(404).json({error: `No task found with id ${updatedTask.id}`})
	}
	if (!categories.some((c:Category) => c.id === updatedTask.category)){
		return res.status(404).json({error: `Couldn't find category with the ID ${updatedTask.id}`})
	}
	tasks = tasks.filter((t:Task) => !_.isEqual(t, taskToUpdate));
	tasks.push(updatedTask);
	return res.status(204).json({message : "Task updated successfully"});
});

//Create a task
app.post('/tasks', (req: Request, res: Response) => {
	const {title, description, category, color} = req.body;
	if (!categories.some((c:Category) => c.id === category)) {
		return res.status(404).json({error: `Couldn't find category with the ID ${category}`});
	}
	const id = tasks.reduce(function(prev, current){
		return (prev && prev.id > current.id) ? prev : current;
	}).id + 1;
	tasks.push({id:id, title:title, description:description, category:category, color:color} as Task);
	return res.status(201).json({message : "Task created successfully"})
})

// Add a new category
app.post('/categories', (req: Request, res: Response) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Name is required for a category' });
	}
	const id = categories.reduce(function(prev, current){
		return (prev && prev.id > current.id) ? prev : current;
	}).id + 1;

	categories.push({ id:id, name:name } as Category);
	res.status(201).json({ message: 'Category added successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
