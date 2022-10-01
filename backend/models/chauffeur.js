const mongoose = require('mongoose');

const Chauffeur = mongoose.model('Chauffeur', {
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    adresse: { type: String },
    photo: { type: String },
    disponibilite: { type: Boolean },
    permisExp: { type: Date },
    permis: { type: String },
    password: { type: String },
    telephone: { type: String }
})

module.exports = { Chauffeur }