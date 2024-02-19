const express = require('express');
const blogsController = require('../controller/blogsController')
const router = express.Router();

router.get('/', blogsController.blogs_all);

router.post('/', blogsController.blogs_create_post);

router.get('/create', blogsController.blogs_create_get);

router.get('/:id', blogsController.blogs_detail);

router.delete('/:id', blogsController.blogs_delete);

module.exports = router;