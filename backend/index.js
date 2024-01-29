import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors'
// import router from './routes/auth.js';
import route from './routes/route.js';
import Router from './routes/notes.js'


// const connectToMongo = require('./db')
// const express = require('express')
// const cors = require('cors')



connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use('/api/auth' , require('./routes/auth'))
// app.use('/api/notes' , require('./routes/notes'))
app.use('/api/auth' ,route )
app.use('/api/notes', route )




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})