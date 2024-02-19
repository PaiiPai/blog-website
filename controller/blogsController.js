const Blog = require('../model/blog');

const blogs_all = (req, res) => {
    Blog.find().sort({ updatedAt: -1 })
        .then(result => res.render('./blogs/index', { title: 'Blogs', blogs: result }))
        .catch(err => console.log(err));
}

const blogs_detail = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => res.render('./blogs/details', { title: 'Blog Details', blog: result }))
        .catch(err => console.log(err));
}

const blogs_create_get = (req, res) => {
    res.render('./blogs/create', { title: 'Create a new blog' });
}

const blogs_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(err => console.log(err));
}

const blogs_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => res.json({ redirect: '/blogs' }))
        .catch(err => console.log(err));
}

module.exports = {
    blogs_all,
    blogs_detail,
    blogs_create_get,
    blogs_create_post,
    blogs_delete
};