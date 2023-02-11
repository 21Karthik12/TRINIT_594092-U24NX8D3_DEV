const express = require('express');

const router = express.Router();
const {
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup
} = require('../controllers/groupController');

router.get('/', getGroups);

router.get('/:id', getGroup);

router.post('/', createGroup);

router.delete('/:id', deleteGroup);

router.patch('/:id', updateGroup);

module.exports = router;