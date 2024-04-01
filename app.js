const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const { urlencoded } = require('body-parser');

// Creating an instance of express app
const app = express();

// connect to mongo db
let user = encodeURIComponent('paipai');
let pw = encodeURIComponent('Choco95%');
const dbURI = `mongodb+srv://${user}:${pw}@cluster0.cfktonb.mongodb.net/Bloggo`;

mongoose.connect(dbURI)
    .then(result => {
        console.log('Connected to MongoDB');
        // making app listen
        app.listen(3000);
    })
    .catch(err => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middlewares
// log all request info before returning response
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static('public'));

// Routing
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Blog Routes
app.use('/blogs', blogRoutes);

// Handling 404 error
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
