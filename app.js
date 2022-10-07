const { buildDB } = require('./db/populateDataBase')
const express = require('express')
const { Movie, User } = require('./models')
const { usersRouter, moviesRouter } = require('./routes')
const app = express()
buildDB()

app.use(express.json())
app.use("/movies", moviesRouter)
app.use("/users", usersRouter)


app.listen(3000, () => {
    console.log('The server is running on http://localhost:3000')
})