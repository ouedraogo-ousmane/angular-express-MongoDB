const express = require('express');
const { Client } = require('../models/client');
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Entreprise } = require('../models/Entreprise')
    //localhost:3500/Entreprise
router.get('/', (req, res) => {
        Entreprise.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    var entreprise = new Entreprise({
        ifu: req.body.ifu,
        logo: req.body.logo,
        rccm: req.body.rccm,
        Client: req.body.Client,

    })
    entreprise.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });

});

/**
 * Recuperation des données
 */

router.get('/data', async(req, res) => {

    let entreprise = await Entreprise.find({});

    let tableData = [];

    for (let i = 0; i < entreprise.length; i++) {

        let client = await Client.findOne({ _id: entreprise[i].Client });

        let data = {
            _id: entreprise[i]._id,
            nomClient: client.nomClient,
            telClient: client.telClient,
            adresseClient: client.adresseClient,
            ifu: entreprise[i].ifu,
            logo: entreprise[i].logo,
            rccm: entreprise[i].rccm,
            idClient: entreprise[i].Client,
            dateCreation: client.dateCreation,
            type: "Entreprise"
        }
        tableData.push(data);
    }

    console.log(tableData);
    res.send(tableData);


});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with the given : ${req.params.id}`)
    }
    Entreprise.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });

});
// la methode de modification

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record in the given : ${req.params.id}`)
    }
    var entreprise = {
        ifu: req.body.ifu,
        logo: req.body.logo,
        rccm: req.body.rccm,
        Client: req.body.Client,
    }
    Entreprise.findByIdAndUpdate(req.params.id, { $set: entreprise }, { new: true },
        (err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }

        });

});

//la methode de suppression
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`pas de données pour l'identifiant : ${req.params.id}`)
    }
    Entreprise.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;