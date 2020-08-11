const express = require('express');
const port = 5000;
var mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/garageonroad',{useNewUrlParser: true});

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
})

var Garage = mongoose.model('garage', contactSchema);

// express specific stuff
app.use("/static", express.static('static'))
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// endpoints
app.get('/', (req, res)=>{
    res.status(200).render('index.pug')
})
app.get('/about', (req, res)=>{
    res.status(200).render('about.pug')
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact', (req, res)=>{
    var myData = new Garage(req.body);
    myData.save().then(()=>{
        res.send("This item has been saves to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
})
app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
});