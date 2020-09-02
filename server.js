
const express = require('express');
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //localhost
        user: 'ginaperano',
        password: 'Spparkymarie_22',
        database: 'face-recognition'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())



app.get("/", (req, res) => res.send());


app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(async data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                try {
                    const user = await db.select('*').from('users')
                        .where('email', '=', req.body.email);
                    res.json(user[0]);
                }
                catch (err) {
                    return res.status(400).json('user does not exist');
                }
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
})


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
        .catch(err => res.status(400).json('User does not exist'))
})


app.put('/image', (req, res) => { image.handleImage(req, res, db) })





app.listen(port, () => console.log(`Server is running on port ${port}`));

