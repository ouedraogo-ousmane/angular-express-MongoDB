const mongoose = require('mongoose');

var Employees = mongoose.model('Employees', {
    nomEmp: {
        type: String
    },
    prenomEmp: {
        type: String
    },
    adresseEmp: { type: String },
    photo: { type: String }
})
module.exports = { Employees }