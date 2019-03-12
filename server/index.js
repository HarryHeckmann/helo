require('dotenv').config()
const express = require("express");
const { json } = require("body-parser");
const massive = require('massive')
const session = require('express-session')
const app = express();
const {SERVERPORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const ac = require('./auth_controller')
const c = require('./controller')

app.use(json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24*7
        }
    })
)

massive(CONNECTION_STRING)
    .then(dbInstance => {
        console.log('Database connected')
        app.set('db', dbInstance)
        })
    .catch(err => {
        console.log(err)
    })


app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.delete('/auth/logout', ac.logout)
app.get('/api/user', ac.getUser)

app.get('/api/posts/:user_id', c.getPosts)
app.get('/api/post/:post_id', c.getPost)
app.post('/api/create', c.newPost)

app.listen(SERVERPORT, () => {
    console.log(`Listening on ${SERVERPORT}`)})