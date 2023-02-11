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

router.get('/', getBlogposts);

router.get('/:id', getBlogpost);

router.post('/', createBlogpost);

router.delete('/:id', deleteBlogpost);

router.patch('/:id', updateBlogpost);

router.patch('/:id/addLike', addLike);

router.patch('/:id/removeLike', removeLike);

module.exports = router;