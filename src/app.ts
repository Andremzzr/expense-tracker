import express from 'express';
const app = express();
const port = 5000;

const expensesRoutes = require('./routes/expensesRoutes')

app.use('/expense', expensesRoutes);

app.listen(port , () => {
    return console.log('Listennninggnisngig')
})