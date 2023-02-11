const express = require('express');

const router = express.Router();
const {
    getBlogposts,
    getBlogpost,
    createBlogpost,
    deleteBlogpost,
    updateBlogpost,
    addLike,
    removeLike
} = require('../controllers/blogpostController');
const upload = require('../middleware/upload');

router.get('/', getBlogposts);

router.get('/:id', getBlogpost);

router.post('/', upload, createBlogpost);

router.delete('/:id', deleteBlogpost);

router.patch('/:id', upload, updateBlogpost);

router.patch('/:id/addLike', addLike);

router.patch('/:id/removeLike', removeLike);

module.exports = router;