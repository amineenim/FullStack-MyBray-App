const express = require('express')

const router = express.Router()
//import the author model
const Author = require('../models/author.js')
//all authors route
router.get('/', (req,res) => {
	res.render('authors/index')
})

//new author Route
router.get('/new', (req,res) => {
	res.render('authors/new', { author : new Author()})
})

//Route that handles creating the new author
router.post('/', (req,res) => {
	res.send('Create')
})

module.exports = router