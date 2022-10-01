const mongoose = require('mongoose');

const Piece = mongoose.model('Piece', {
    nom: { type: String },
    dureeDeVie: { type: Number },
    echangeDate: { type: Date }


});
module.exports = { Piece }