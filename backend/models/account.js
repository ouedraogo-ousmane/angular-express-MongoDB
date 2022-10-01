const { any } = require('@hapi/joi');
const mongoose = require('mongoose');
const { Roles } = require('./roles');

// Declaration du model de données de l'entité Account 
const Account = mongoose.model('Account', {

        email: {
            type: String,
            unique: true,
            min: 6,
            max: 255
        },
        telephone: {
            type: String,
            unique: true,
            min: 6,
            max: 255,
        },
        nom: {
            type: String,
            min: 6,
            max: 255
        },
        prenom: {
            type: String,
            min: 6,
            max: 255,
        },
        password: {
            type: String,
            min: 6,
            max: 255,
            required: true
        },
        loginToken: {
            type: String
        },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }
        // rolesInfos: { type: any }

    })
    /*
    Account.pre('save', function(next) {
        const user = this;
        bcrypt.hash(user.password)
    })*/

module.exports = { Account }