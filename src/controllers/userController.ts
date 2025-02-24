const bcrypt = require('bcrypt');
const  { databaseService } = require('../services/PgSqlService');
const jwt = require('jsonwebtoken');


async function registerUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = databaseService.createUser({ username, password: hashedPassword });

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error creating user:", error); 
        res.status(500).json({ error: 'Registration failed' });
    }
}

async function loginUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await databaseService.getUser({ username });

        if ( !user ) {
            return res.status(401).json({error: "No match user with credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET , { expiresIn: '1h', });

        res.status(200).json({ token });

    } catch (error) {
        console.error("Error login user:", error); 
        res.status(500).json({ error: 'Login failed' });
    }
}


module.exports = { registerUser, loginUser }