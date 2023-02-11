const mongoose = require('mongoose');
const Group = require('../models/groupModel');

/* Get all groups */
const getGroups = async (req, res) => {
    const groups = await Group.find({}).sort({createdAt: -1});
    res.status(200).json(groups);
}

/* Get a single group */
const getGroup = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Group not found'});
    }
    const group = await Group.findById(id);
    if(!group) {
        return res.status(404).json({error: 'Group not found'});
    }
    res.status(200).json(group);
}

/* Create a new group */
const createGroup = async (req, res) => {
    const {group_name, description} = req.body;
    try {
        const group = await Group.create({group_name, description});
        res.status(200).json(group);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

/* Delete a group */
const deleteGroup = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Group not found'});
    }
    const group = await Group.findOneAndDelete({_id: id});
    if(!group) {
        return res.status(404).json({error: 'Group not found'});
    }
    res.status(200).json(group);
}

/* Update a group */
const updateGroup = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Group not found'});
    }
    const group = await Group.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!group) {
        return res.status(404).json({error: 'Group not found'});
    }
    res.status(200).json(group);
}

module.exports = {
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup
}