import express from 'express';
const app = express();
const dotenv = require('dotenv');
const port = 5000;
const expensesRoutes = require('./routes/expensesRoutes');

app.use(express.json());
express.urlencoded({ extended: true })
dotenv.config();


app.use('/expense', expensesRoutes);

app.listen(port , () => {
    return console.log(`Litenning to port http://localhost:${port}`)
})