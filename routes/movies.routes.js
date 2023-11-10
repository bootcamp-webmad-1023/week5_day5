const express = require('express')
const router = express.Router()

const Movie = require('./../models/Movie.model')
const uploaderMiddleware = require('../middleware/uploader.middleware')


// New movie (render)
router.get("/crear", (req, res, next) => {
    res.render("movies/create")
})

// New movie (handler)
router.post("/crear", uploaderMiddleware.single('cover'), (req, res, next) => {

    const { path: cover } = req.file
    const { title, description } = req.body

    Movie
        .create({ title, description, cover })
        .then(() => res.redirect('/peliculas'))
        .catch(err => next(err))
})

// Gallery
router.get("/", (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render('movies/list', { movies }))
        .catch(err => next(err))
})



module.exports = router