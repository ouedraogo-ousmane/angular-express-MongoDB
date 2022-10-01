const mongoose = require('mongoose');

var TypeDepense = mongoose.model('typeDepense', {
    libelle: { type: String }
});
module.exports = { TypeDepense }