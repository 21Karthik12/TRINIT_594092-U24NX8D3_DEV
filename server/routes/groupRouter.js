const express = require('express');

const router = express.Router();
const {
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
    addUser
} = require('../controllers/groupController');
const upload = require('../middleware/upload');

router.get('/', getGroups);

router.get('/:id', getGroup);

router.post('/', upload, createGroup);

router.delete('/:id', deleteGroup);

router.patch('/:id', upload, updateGroup);

router.patch('/:id/addUser', addUser); 

module.exports = router;