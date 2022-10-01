const mongoose = require('mongoose');

const Client = mongoose.model('client', {
    nomClient: {
        type: String,
        unique: true
    },
    telClient: { type: String },
    adresseClient: { type: String },
    dateCreation: { type: Date, default: new Date() }
})

module.exports = { Client }