const express = require('express');
const { Client } = require('../models/client');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Particulier } = require('../models/Particulier')

//localhost:3500/Particulier
router.get('/', (req, res) => {
        Particulier.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    const particulier = new Particulier({
        prenom: req.body.prenom,
        Client: req.body.Client
    })
    particulier.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })

})

router.get('/particulier', async(req, res) => {

    let particulier = await Particulier.find({});

    let tableData = [];

    for (let i = 0; i < particulier.length; i++) {

        let client = await Client.findOne({ _id: particulier[i].Client });

        let data = {
            _id: particulier[i]._id,
            nomClient: client.nomClient,
            telClient: client.telClient,
            adresseClient: client.adresseClient,
            prenom: particulier[i].prenom,
            dateCreation: client.dateCreation,
            idClient: particulier[i].Client,
            type: "Personne"

        }
        tableData.push(data);
    }

    // console.log(tableData);
    res.send(tableData);


});

router.get('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with the given : ${req.params.id}`)
        }
        Particulier.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    // la methode de modification

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record in the given : ${req.params.id}`)
    }
    const particulier = {
        prenom: req.body.prenom,
        Client: req.body.Client
    }
    Particulier.findByIdAndUpdate(req.params.id, { $set: particulier }, { new: true },
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
    Particulier.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;