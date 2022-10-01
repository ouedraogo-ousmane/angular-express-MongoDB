const mongoose = require('mongoose');

var Responsable = mongoose.model('Responsable', {
    email: { type: String },
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    adresse: { type: String },
    photo: { type: String }
});
module.exports = { Responsable }