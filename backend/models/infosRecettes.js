const mongoose = require('mongoose');

const InfosRecette = mongoose.model('infosRecette', {
    coutUnitaire: { type: Number },
    dateEnVigueur: { type: Date },
    idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }
});
module.exports = { InfosRecette }