const mongoose = require('mongoose');
const Image = mongoose.model('image', {
    name: {
        type: String
    },
    desc: {
        type: String
    },
    img: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    }
});

//Image is a model which has a schema Image

module.exports = { Image };