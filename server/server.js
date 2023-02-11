require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const projectRouter = require('./routes/projectRouter');
const transactionRouter = require('./routes/transactionRouter');
const blogpostRouter = require('./routes/blogpostRouter');

const app = express();
const path = require('path');
const cors = require('cors');

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/api/projects', projectRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/blogposts', blogpostRouter);

app.get('/', (req, res) => {
    res.render('index');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Mongo connected and listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error found');
        console.log(err);
    })