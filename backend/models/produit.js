const mongoose = require('mongoose');

const Produit = mongoose.model('Produit', {
    designation: { type: String },
    unite: { type: String }
})
module.exports = { Produit }