const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Document } = require('../models/document')
    //localhost:3500/Document
router.get('/', (req, res) => {
        Document.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    var document = new Document({
        dateDebut: req.body.dateDebut,
        dateExpire: req.body.dateExpire,
        libelle: req.body.libelle,
        vehicule: req.body.vehicule,

    });
    document.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });

});
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with the given : ${req.params.id}`)
    }
    Document.findById(req.params.id, (err, doc) => {
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
    var document = {
        dateDebut: req.body.dateDebut,
        dateExpire: req.body.dateExpire,
        libelle: req.body.libelle,
        vehicule: req.body.vehicule,
    }
    Document.findByIdAndUpdate(req.params.id, { $set: document }, { new: true },
        (err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }

        });

})

//la methode de suppression
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`pas de données pour l'identifiant : ${req.params.id}`)
    }
    Document.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;