const express = require('express');

const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    addInterest,
    addGroup
} = require('../controllers/userController');
const upload = require('../middleware/upload');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', upload, createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', upload, updateUser);

router.patch('/:id/addGroup', addGroup);

router.patch('/:id/addInterest', addInterest);

module.exports = router;