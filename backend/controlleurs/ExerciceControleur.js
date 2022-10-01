const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Exercice } = require('../models/Exercice')
    //localhost:3500/Exercice

router.get('/', (req, res) => {
    mongoose.model('Exercice').aggregate([{
        $lookup: {
            from: "responsables",
            localField: "responsable",
            foreignField: "_id",
            as: "auteur"
        }

    }]).exec((err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });

})

//post methods

router.post('/', (req, res) => {
    const exercice = new Exercice({
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        etat: req.body.etat,
        responsable: req.body.responsable

    });
    exercice.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })

})
router.get('/:id', (req, res) => {
        console.log(req.params.id);
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with the given : ${req.params.id}`)

        }
        Exercice.findById(req.params.id, (err, doc) => {
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
    const exercice = {
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        etat: req.body.etat,
        responsable: req.body.responsable

    };
    Exercice.findByIdAndUpdate(req.params.id, { $set: exercice }, { new: true },
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
    Exercice.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;