const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const employeesRouter = require('./routes/employee');
const { errorHandler } = require('./middleware/logger');

const {initDatabase} = require('./config/database');
app.use(express.json());




//initDatabase();


// Health Check API Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
  });

  app.get('/reinitialise', (req, res) => {
   
    initDatabase();
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
  });



// Define your API routes here
app.use('/api/employees', employeesRouter);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
