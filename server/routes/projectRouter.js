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

router.get('/', getProjects);

router.get('/:id', getProject);

router.post('/', createProject);

router.delete('/:id', deleteProject);

router.patch('/:id', updateProject);

router.patch('/:id/addLike', addLike);

router.patch('/:id/removeLike', removeLike);

module.exports = router;