const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();


const port = 5000;
const expensesRoutes = require('./routes/expensesRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(bodyParser.json());

express.urlencoded({ extended: true })
dotenv.config();


app.use('/expense', expensesRoutes);
app.use('/user', userRoutes);

app.listen(port , () => {
    return console.log(`Litenning to port http://localhost:${port}`)
})
