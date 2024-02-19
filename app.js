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

// mongodb sandbox
/* app.get('/add-blog', (req, res) => {
    const blog = new Blog({ // create an instance of a model
        title: 'Ahsoka',
        snippet: 'I have to sort this out on my own. Without the council. And without you.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    });

    blog.save() // save data in mongodb
        .then(results => res.send(results))
        .catch(err => console.log(err));
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(results => res.send(results))
        .catch(err => console.log(err));
});

app.get('/blog', (req, res) => {
    Blog.findById('65d3341f3a8725ab55e44bb7')
        .then(results => res.send(results))
        .catch(err => console.log(err));
}); */

/* app.use((req, res, next) => { // Manual way
    console.log('Request has been made:');
    console.log('host: ' + req.hostname);
    console.log('path: ' + req.path);
    console.log('method: ' + req.method);
    next();
}); */

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