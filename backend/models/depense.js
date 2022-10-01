const mongoose = require('mongoose');

const Depense = mongoose.model('Depense', {
    libelle: { type: String },
    montant: { type: Number },
    date: { type: Date },
    mission: { type: mongoose.Schema.Types.ObjectId, ref: 'mission' }
})

module.exports = { Depense }