const express = require('express')
const moviesRouter = express.Router()
const { check, validationResult } = require('express-validator')
const { Movie } = require('../models/index')

//All Movies

moviesRouter.get('/allmovies', async (req, res) => {
    const allFilms = await Movie.findAll()
    res.send(allFilms)
})


//Specific Movie

moviesRouter.get('/filmbytitle/:title', async (req, res) => {
    let newString1 = req.params.title.toUpperCase()
    const queriedMovie = await Movie.findOne({ where: { title: newString1 } })
    if (!queriedMovie) {
        res.send("Sorry, we don't have that film.Ensure you are using underscores instead of spaces in title")
        return
    }
    let { title, genre, rating } = queriedMovie
    let payload = {
        title: title,
        genre: genre,
        rating: rating
    }
    console.log(queriedMovie)
    res.send(payload)
})

// Movies from Genre
moviesRouter.get('/:movie', async (req, res) => {
    let newString = req.params.movie[0].toUpperCase() + req.params.movie.slice(1).toLowerCase()
    const queriedGenre = await Movie.findAll({ where: { genre: newString } })
    let movieDetails = []
    if (queriedGenre.length === 0) {
        res.send("Sorry, we don't have any films in that genre")
        return
    } else {
        for (let i = 0; i < queriedGenre.length; i++) {
            let { title, genre, rating } = queriedGenre[i]
            let payload = {
                title: title,
                genre: genre,
                rating: rating
            }
            movieDetails.push(payload)
        }
    }
    res.send(movieDetails)
})


// Update Rating of film

moviesRouter.put('/updatefilmrating', async (req, res) => {
    await Movie.update({
        rating: req.body.rating,
    },
        {
            where: { title: req.body.title },
        })
    res.sendStatus(200)
})

// add new movie, validates rating is required

moviesRouter.post('/', [check('rating').not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() })
        return
    }
    await Movie.create(req.body)
    res.sendStatus(200)
})

//Delete a movie

moviesRouter.delete('/removefilm/:title', async (req, res) => {
    let newString1 = req.params.title.toUpperCase()
    const queriedMovie = await Movie.findOne({ where: { title: newString1 } })
    if (queriedMovie !== null) {
        await queriedMovie.destroy()
        res.send('Film Removed')
    }
    res.send('We have not got that film')
}
    // await queriedMovie.destroy()
    // res.send('Film Removed')
)

module.exports = { moviesRouter }