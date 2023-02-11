const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.json({msg: 'GET all users'});
});

router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single user'});
});

router.post('/', async (req, res) => {
    const {username, password, ngo, email, interests} = req.body;
    try {
        const user = await User.create({username, password, ngo, email, interests});
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
    res.json({msg: 'POST a new user'});
})

router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a user'});
});

router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a user'});
});

module.exports = router;