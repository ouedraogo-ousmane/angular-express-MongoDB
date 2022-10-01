const mongoose = require('mongoose');

var RecetteTransport = mongoose.model('recetteTransport', {
    quantite: { type: Number },
    coutUnitaire: { type: Number },
    dateEntree: { type: Date },
    idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    idMission: { type: mongoose.Schema.Types.ObjectId, ref: 'mission' },
});
module.exports = { RecetteTransport }