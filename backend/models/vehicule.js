const mongoose = require('mongoose');

const Vehicule = mongoose.model('Vehicule', {
    immatriculation: { type: String },
    poids: { type: Number },
    //image: { type: String },
    model: { type: String },
    disponibilite: { type: Boolean },
    fonction: { type: String },
    miseCirculation: { type: Date }

})

module.exports = { Vehicule }