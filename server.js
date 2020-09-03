
const express = require('express');
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');



const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //localhost
        user: 'ginaperano',
        password: 'Spparkymarie_22',
        database: 'face-recognition'
    }
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => { res.send(db.users) })

app.post('/signin', signin.handleSignin(db, bcrypt))


app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
})


app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
})



app.listen(port, () => console.log(`Server is running on port ${port}`));

