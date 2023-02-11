const mongoose = require('mongoose');
const Project = require('../models/projectModel');

/* Get all projects */
const getProjects = async (req, res) => {
    const projects = await Project.find({}).sort({createdAt: -1});
    res.status(200).json(projects);
}

/* Get a single project */
const getProject = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Project not found'});
    }
    const project = await Project.findById(id);
    if(!project) {
        return res.status(404).json({error: 'Project not found'});
    }
    res.status(200).json(project);
}

/* Create a new project */
const createProject = async (req, res) => {
    const {title, description, start_date, user_id} = req.body;
    try {
        const project = await Project.create({title, description, start_date, user_id});
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

/* Delete a project */
const deleteProject = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Project not found'});
    }
    const project = await Project.findOneAndDelete({_id: id});
    if(!project) {
        return res.status(404).json({error: 'Project not found'});
    }
    res.status(200).json(project);
}

/* Update a project */
const updateProject = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Project not found'});
    }
    const project = await Project.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!project) {
        return res.status(404).json({error: 'Project not found'});
    }
    res.status(200).json(project);
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
}