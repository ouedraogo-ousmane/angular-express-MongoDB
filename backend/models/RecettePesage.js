const mongoose = require('mongoose');
const recette = require('./RecetteTransport')

var RecettePesage = mongoose.model('RecettePesage', {
    numPesee: { type: Number },
    poids1: { type: Number },
    poids2: { type: Number },
    coutUnitaire: { type: Number },
    dateEntree: { type: Date },
    idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    idMission: { type: mongoose.Schema.Types.ObjectId, ref: 'mission' },
});
module.exports = { RecettePesage }