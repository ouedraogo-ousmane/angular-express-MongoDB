const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { RecettePesage } = require('../models/RecettePesage')
    //localhost:3500/RecettePesage
router.get('/', (req, res) => {
        RecettePesage.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    const recette = new RecettePesage({
        numPesee: req.body.numPesee,
        poids1: req.body.poids1,
        poids2: req.body.poids2,
        idProduit: req.body.idProduit,
        idClient: req.body.idClient,
        idMission: req.body.idMission,
        coutUnitaire: req.body.coutUnitaire,
        dateEntree: req.body.dateEntree
    })
    recette.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })

})
router.get('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with the given : ${req.params.id}`)
        }
        RecettePesage.findById(req.params.id, (err, doc) => {
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
    var recette = {
        numPesee: req.body.numPesee,
        poids1: req.body.poids1,
        poids2: req.body.poids2,
        idProduit: req.body.idProduit,
        idClient: req.body.idClient,
        idMission: req.body.idMission,
        coutUnitaire: req.body.coutUnitaire,
        dateEntree: req.body.dateEntree

    }
    RecettePesage.findByIdAndUpdate(req.params.id, { $set: recette }, { new: true },
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
    RecettePesage.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;