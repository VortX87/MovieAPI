const express = require('express')
const usersRouter = express.Router()
const { check, validationResult } = require('express-validator')
const { User, Movie } = require('../models/index')

usersRouter.get('/', (req, res) => {
    res.send("Its works")
})
// All Users
usersRouter.get('/allusers', async (req, res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
})

//specific user
usersRouter.get('/userbyname/:name', async (req, res) => {
    let newString1 = req.params.name.toUpperCase()
    const queriedUser = await User.findOne({ where: { name: newString1 } })
    if (!queriedUser) {
        res.send("Sorry, we don't have that user.Ensure you are using underscores instead of spaces in title")
        return
    }
    let { name, email, watched } = queriedUser
    let payload = {
        name: name,
        email: email,
        watched: watched
    }
    console.log(queriedUser)
    res.send(payload)
})

// watched List

usersRouter.get('/watchedlist/:name', async (req, res) => {
    let newString1 = req.params.name.toUpperCase()
    const queriedUser = await User.findOne({ where: { name: newString1 } })
    if (!queriedUser.watched == 0) {
        let { watched } = queriedUser
        let payload = {
            watched: watched
        }
        res.send(payload)
    }
    res.send("Sorry, this user has not watched anything")
    return
})

//Add movie to user watch list

usersRouter.put('/addtowatchedlist/:name/:title', async (req, res) => {

    let userString = req.params.name.toUpperCase()
    console.log(userString)
    const queriedUser = await User.findOne({ where: { name: userString } })

    let movieString = req.params.title.toUpperCase()
    console.log(movieString)
    const queriedMovie = await Movie.findOne({ where: { title: movieString } })

    if (queriedUser == null) {
        res.send("Sorry, we don't have that user.Ensure you are using underscores instead of spaces in title")
        return
    }

    if (queriedMovie == null) {
        res.send("Sorry, we don't have that film.Ensure you are using underscores instead of spaces in title")
        return
    }

    if (queriedUser.watched == 0) {
        await User.update({
            watched: queriedMovie.title,
        },
            {
                where: { name: req.params.name },
            })
        res.send("Watched list for user has been updated")
    } else {
        await User.update({
            watched: queriedUser.watched + ', ' + queriedMovie.title
        },
            {
                where: { name: req.params.name },
            })
        res.send("Watched list for user has been updated")
    }
})

module.exports = { usersRouter }

