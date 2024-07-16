const path = require('path')
const express = require('express')
const hbs=require('hbs')

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and viewspath
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by:Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ruther Ford'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Johnathon'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }

    req.query.address
    res.send({
        location:'philadelphia',
        forecast:"it's rainy outside"
    })
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide correct link'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'johnathan',
        errormessage:'help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'johnathan',
        errormessage:'404 page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// Goal: Create a partial for the footer

// 1. Setup the template for the footer partial "created by someone else"
// 2. Render the partials at the bottom of all three pages
// 3. Test you work by visiting al three pages

// Task completed