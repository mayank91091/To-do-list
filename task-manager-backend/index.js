const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Azure Cosmos DB for MongoDB
mongoose.connect("mongodb://terra:5dPZBbQptsSrxCGnXconiDnGKxXx6cdLlcaSHN1M8SZ9ClsSVG23LS1k9zIhGENtVOkKq3u6De5dACDbtPG77A%3D%3D@terra.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@terra@")
  .then(() => {
    console.log('Connected to Azure Cosmos DB');
  })
  .catch((error) => {
    console.error('Error connecting to Azure Cosmos DB:', error);
  });

// Custom route handler for the root path
app.get('/', (req, res) => {
  res.send('BACKEND!');
});

// Define Task Schema and Model using mongoose
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Add more fields as needed
});

const Task = mongoose.model('Task', taskSchema);

// CRUD Operations

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
