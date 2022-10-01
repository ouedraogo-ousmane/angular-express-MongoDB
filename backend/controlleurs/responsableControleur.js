const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Responsable } = require('../models/Responsable')
    //localhost:3500/Responsable
router.get('/', (req, res) => {
        Responsable.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods




router.post('/', (req, res) => {
    var responsable = new Responsable({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        photo: req.body.photo,
        email: req.body.email
    });
    responsable.save((err, doc) => {
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
        Responsable.findById(req.params.id, (err, doc) => {
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
        return res.status(400).send(`No record in the given : ${req.params.id}`);
    }
    var responsable = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        photo: req.body.photo,
        email: req.body.email
    };
    Responsable.findByIdAndUpdate(req.params.id, { $set: responsable }, { new: true },
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
    Responsable.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;