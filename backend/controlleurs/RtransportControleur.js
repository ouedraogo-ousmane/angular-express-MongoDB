const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { RecetteTransport } = require('../models/RecetteTransport')
const { pays } = require('../models/pays')
const { ville } = require('../models/ville')
    //localhost:3500/RecetteTransport
router.get('/', (req, res) => {
        RecetteTransport.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    var recette = new RecetteTransport({
        quantite: req.body.quantite,
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
        RecetteTransport.findById(req.params.id, (err, doc) => {
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
        quantite: req.body.quantite,
        idProduit: req.body.idProduit,
        idClient: req.body.idClient,
        idMission: req.body.idMission,
        coutUnitaire: req.body.coutUnitaire,
        dateEntree: req.body.dateEntree
    }
    RecetteTransport.findByIdAndUpdate(req.params.id, { $set: recette }, { new: true },
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
    RecetteTransport.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;