const multer = require('multer');
const express = require('express');
const fs = require('fs');
const { Image } = require('../models/image');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });

// Step 7 - the GET request handler that provides the HTML UI

router.get('/', (req, res) => {
    Image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.send(items);
        }
    });
});

// Step 8 - the POST handler for processing the uploaded file

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            item.save();
            res.redirect('/');
        }
    });
});
module.exports = router;