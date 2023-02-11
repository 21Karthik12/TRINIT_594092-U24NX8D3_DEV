const express = require('express');

const router = express.Router();
const {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject,
    addLike,
    removeLike
} = require('../controllers/projectController');
const upload = require('../middleware/upload');

router.get('/', getProjects);

router.get('/:id', getProject);

router.post('/', upload, createProject);

router.delete('/:id', deleteProject);

router.patch('/:id', upload, updateProject);

router.patch('/:id/addLike', addLike);

router.patch('/:id/removeLike', removeLike);

module.exports = router;