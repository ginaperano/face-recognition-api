
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcyrptjs');
const cors = require('cors');
const knex = require('knex');
const port = process.env.PORT || 3001;


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => res.send("server is working!"));

app.post('/signin', (req, res) => {
    res.json("signin")
})



app.listen(port, () => console.log(`Server is running on port ${port}`));


/*
/ root route --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userId --> GET = user
/ image --> PUT --> user
*/