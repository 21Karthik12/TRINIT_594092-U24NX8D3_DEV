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

router.get('/', getGroups);

router.get('/:id', getGroup);

router.post('/', createGroup);

router.delete('/:id', deleteGroup);

router.patch('/:id', updateGroup);

router.patch('/:id/addUser', addUser); 

module.exports = router;