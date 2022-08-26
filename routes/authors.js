const express = require('express')

const router = express.Router()
//import the author model
const Author = require('../models/author.js')
//all authors route
router.get('/', async (req,res) => {

	let searchOptions = {}
	if(req.query.name != null && req.query.name !=='')
	{
		searchOptions.name = new RegExp(req.query.name,'i')
	}
	try {
		//retreive all authors
		//the object passed must contain any conditions for the search
		//since we need no specific author the object is empty
		const authors = await Author.find(searchOptions)
		res.render('authors/index',
			{authors :authors,
				searchOptions : req.query })
	} catch {
		res.redirect('/')
	}
})


//new author Route
router.get('/new', (req,res) => {
	res.render('authors/new', { author : new Author()})
})

//Route that handles creating the new author
router.post('/', async (req,res) => {

	const author = new Author ({
		name : req.body.name
	})
	 try {
	 	const newAuthor = await author.save()
	 	//res.redirect(`authors/${newAuthor.id}`)
	 	res.redirect('/authors')
	 } catch {
	 	res.render('authors/new', {
	 		author : author,
	 		errorMessage : 'Error creating the Author'
	 	})
	 }
})

module.exports = router