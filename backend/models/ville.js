const mongoose = require('mongoose');

var Ville = mongoose.model('Ville', {
    nom: { type: String },
    pays: { type: mongoose.Schema.Types.ObjectId, ref: 'Pays' }
})
module.exports = { Ville }