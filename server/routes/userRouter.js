const express = require('express');

const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    addInterest
} = require('../controllers/userController');
const upload = require('../middleware/upload');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', upload, createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.patch('/:id/addInterest', addInterest);

module.exports = router;