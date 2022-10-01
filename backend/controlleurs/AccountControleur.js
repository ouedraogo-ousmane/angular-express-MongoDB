const express = require('express');
const bcrypt = require("bcrypt");
var router = express.Router();
const { Account } = require('../models/account');
const ObjectId = require('mongoose').Types.ObjectId;

const { Roles } = require('../models/roles');
const verify = require('./verifyToken');

const Joi = require('@hapi/joi'); // Va permettre de gerer des controles

//Importation de token

const jwt = require('jsonwebtoken');


// La methode get qui prend rien en paramètre mais permet de recuperer
// toutes les données de l'entité Account
router.get('/', async(req, res) => {

        Account.find((err, doc) => {

            if (!err) {

                res.send(doc); // envoi des données dans doc

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', async(req, res) => {

    //Generation d'une clé de hashage
    // Hashage du mot de passe

    salt = await bcrypt.genSalt(10);

    passwordHashed = await bcrypt.hash(req.body.password, salt);


    const account = new Account({

        email: req.body.email,
        telephone: req.body.telephone,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: passwordHashed,
        role: req.body.role

    });
    try {

        //const accountSaved = await account.save();

        //res.send(accountSaved);


        account.save((err, doc) => {

            if (!err) {

                res.send(doc);

            } else {

                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }

})

//Methode de login

router.post('/login', async(req, res) => {

    const accountExist = await Account.findOne({ email: req.body.userEmailOrPhone });

    //const accountExist1 = await Account.findOne({ telephone: req.body.telephone });


    if (!accountExist) return res.status(400).send('Email ou telephone introuvable');

    const validPassword = await bcrypt.compare(req.body.userPassword, accountExist.password);

    // if (accountExist.password != req.body.password) return res.status(400).send('Mot de passe incorrecte');

    const token = jwt.sign({ _id: accountExist._id }, process.env.TOKEN_SECRET);

    const roles = await Roles.findOne({ _id: accountExist.role });

    res.header('authentification-token', token);
    const account = new Account({
        email: accountExist.email,
        telephone: accountExist.telephone,
        nom: accountExist.nom,
        prenom: accountExist.prenom,
        loginToken: token,
        _id: accountExist._id,
        role: accountExist.role
    });
    res.send(account);

})

router.get('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with the given : ${req.params.id}`)
        }
        Account.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    // la methode de modification

router.put('/:id', async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {

        return res.status(400).send(`No record in the given : ${req.params.id}`)

    }

    const account = {
        email: req.body.email,
        telephone: req.body.telephone,
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.body.role
    }
    Account.findByIdAndUpdate(req.params.id, { $set: account }, { new: true },
        (err, doc) => {
            if (!err) {
                res.send(doc);

            } else {

                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })
})

//la methode de suppression
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`pas de données pour l'identifiant : ${req.params.id}`)
    }
    Account.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router; // permet de pouvoir exporter la classe AccountControleur