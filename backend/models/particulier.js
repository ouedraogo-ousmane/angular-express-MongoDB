const mongoose = require('mongoose');

const Particulier = mongoose.model('Particulier', {
    prenom: { type: String },
    Client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' }
});
module.exports = { Particulier }