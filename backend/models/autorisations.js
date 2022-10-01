const { any } = require('@hapi/joi');
const mongoose = require('mongoose');
const { Roles } = require('./roles');

// Declaration du model de données de l'entité Autorisation 
const Autorisation = mongoose.model('Autorisation', {

    nom: {
        type: String,
        unique: true,
        min: 6,
        max: 255
    },
    read: {
        type: Boolean,
        unique: true,
        min: 6,
        max: 255,
    },
    write: {
        type: Boolean,
        unique: true,
        min: 6,
        max: 255
    },
    update: {
        type: Boolean,
        unique: true,
        min: 6,
        max: 255,
    },


})


module.exports = { Autorisation }