if(process.env.NODE_ENV !== 'production')
{
	require('dotenv').config()
}

const express = require('express')

const app = express()

const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index.js')
const authorRouter = require('./routes/authors.js')

//set the application View engine
app.set('view engine','ejs')

//set where these views come from 
//the current directory dirname and we append the  '/views'

app.set('views', __dirname + '/views')

//set the layout for our html so we dont need to duplicate elements such as header footer
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',() => () => console.log('connected to mongoose'))



//set the router that handles the home route'/'
app.use('/',indexRouter)

//set the router that handles the authors routes
app.use('/authors',authorRouter)

app.listen(process.env.PORT || 3001, () => {
	console.log('server running on port 3001')
})

