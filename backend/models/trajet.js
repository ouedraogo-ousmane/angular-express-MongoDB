const mongoose = require('mongoose');

const Trajet = mongoose.model('Trajet', {
    type: { type: String },
    distance: { type: Number },
    villeA: { type: mongoose.Schema.Types.ObjectId, ref: 'Ville' },
    paysDepart: { type: mongoose.Schema.Types.ObjectId, ref: 'Pays' },
    villeD: { type: mongoose.Schema.Types.ObjectId, ref: 'Ville' },
    paysDestination: { type: mongoose.Schema.Types.ObjectId, ref: 'Pays' },

});
module.exports = { Trajet }