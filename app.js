const { render } = require('ejs');
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');


const app = express();

const dbURI = 'mongodb+srv://username:<password>@blogclusters.xc2fx.mongodb.net/<database-name>?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log('error'));

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Home page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Blogs Routes
app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => { 
        res.render('index', { blogs: result })
    }).catch((err) => {
        console.log('error blog routes');
    });
});

app.post('/blogs', (req, res) => {
   const blog = new Blog(req.body);

   blog.save()
     .then((result) => {
        res.redirect('/blogs');
   }).catch((err) => {
       console.log('post error');
   });
});

app.get('/blogs/:id', (req, res) => {
   const id = req.params.id;
   Blog.findById(id)
   .then(result => {
      res.render('details', { blog: result });
   }).catch(err => {
       console.log('error blog singular');
   });
});

// Delete Blog
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs' })
    })
    .catch(err => {
        console.log(err);
    });
});


// About page
app.get('/about', (req ,res) =>{
    res.render('about', { title: 'About' });
});

// Create blog page
app.get('/add', (req, res) => {
    res.render('add');
});