const mongoose = require('mongoose')

const pays = mongoose.model('pays', {
    nom: { type: String },
    dateCreation: { type: Date }
});

module.exports = { pays }