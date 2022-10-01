const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { TypeDepense } = require('../models/TypeDepense');
//localhost:3500/TypeDepense
router.get('/', (req, res) => {
        TypeDepense.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    var type = new TypeDepense({
        libelle: req.body.libelle,
    })
    type.save((err, doc) => {
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
        TypeDepense.findById(req.params.id, (err, doc) => {
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
    var type = {
        libelle: req.body.libelle,
    }
    TypeDepense.findByIdAndUpdate(req.params.id, { $set: type }, { new: true },
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
    TypeDepense.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;