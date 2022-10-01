const mongoose = require('mongoose');

var Exercice = mongoose.model('Exercice', {
    dateDebut: { type: Date },
    dateFin: { type: Date },
    etat: { type: Boolean },
    responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Responsable' }
});
module.exports = { Exercice }