const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Vehicule } = require('../models/vehicule');
//localhost:3500/Vehicule
router.get('/', (req, res) => {
        Vehicule.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    const vehicule = new Vehicule({
        immatriculation: req.body.immatriculation,
        poids: req.body.poids,
        // image: req.body.image,
        capacite: req.body.capacite,
        disponibilite: req.body.disponibilite,
        miseCirculation: req.body.miseCirculation,
        fonction: req.body.fonction,
    });
    vehicule.save((err, doc) => {
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
        Vehicule.findById(req.params.id, (err, doc) => {
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
    const vehicule = {
        immatriculation: req.body.immatriculation,
        poids: req.body.poids,
        image: req.body.image,
        capacite: req.body.capacite,
        disponibilite: req.body.disponibilite,
        miseCirculation: req.body.miseCirculation,
        fonction: req.body.fonction,
    };
    Vehicule.findByIdAndUpdate(req.params.id, { $set: vehicule }, { new: true },
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
    Vehicule.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;