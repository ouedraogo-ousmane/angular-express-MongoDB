const mongoose = require('mongoose');

const Enregistrement = mongoose.model('Enregistrement', {
    dateEntree: { type: Date },
    quantite: { type: Number },
    montant: { type: Number },
    activite: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance' },
    piece: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece' }
});
module.exports = { Enregistrement }