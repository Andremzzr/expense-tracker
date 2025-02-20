import express from 'express';
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = 5000;

const expensesRoutes = require('./routes/expensesRoutes');

app.use('/expense', expensesRoutes);

app.listen(port , () => {
    return console.log('Listennninggnisngig')
})