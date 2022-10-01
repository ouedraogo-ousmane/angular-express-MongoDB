const mongoose = require('mongoose');

const Entreprise = mongoose.model('Entreprise', {
    ifu: { type: String },
    logo: { type: String },
    rccm: { type: String },
    Client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' }

});
module.exports = { Entreprise }