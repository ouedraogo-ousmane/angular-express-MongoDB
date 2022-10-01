const mongoose = require('mongoose');


const Roles = mongoose.model('Roles', {

    nom: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    }

    /**
     * operations: new Operation({ nom: "", write: false, read: false, update: false })
     * ,
    operations: [{
        name: { type: String },
        write: { type: Boolean },
        read: { type: Boolean },
        update: { type: Boolean }
    }]
     *  
     */
});

module.exports = { Roles };