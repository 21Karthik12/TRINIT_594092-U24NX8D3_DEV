const { request } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');

/* Get all users */
const getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

/* Get a single user */
const getUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'});
    }
    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
}

/* Create a new user */
const createUser = async (req, res) => {
    const {username, password, ngo, email, phone, interests, origin, impact, profile_img} = req.body;
    try {
        const user = await User.create({username, password, ngo, email, phone, interests, origin, impact});
        if(profile_img) {
            user.profile_img = profile_img.path;
        } else {
            console.log(profile_img);
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

/* Delete a user */
const deleteUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'});
    }
    const user = await User.findOneAndDelete({_id: id});
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
}

/* Update a user */
const updateUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'});
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
}

/* Add an interest */
const addInterest = async (req, res) => {
    const {id} = req.params;
    const {interest} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'});
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        $push : {"interests": interest}
    });
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
}

/* Add a group */
const addGroup = async (req, res) => {
    const {id} = req.params;
    const {group} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'});
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        $push : {"groups": group}
    });
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    addInterest,
    addGroup
}