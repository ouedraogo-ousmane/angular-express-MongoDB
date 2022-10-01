const mongoose = require('mongoose');

var Document = mongoose.model('document', {
    dateDebut: { type: Date },
    dateExpiration: { type: Date },
    libelle: { type: String },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule' }
});
module.exports = { Document }