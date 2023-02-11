require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('myImage');

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index', {
                msg: err
            })
        } else {
            console.log(req.file);
            res.send('Uploaded');
        }
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Mongo connected and listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })