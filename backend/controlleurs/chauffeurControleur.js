const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const storage = require('../helpers/storage')
const { Chauffeur } = require('../models/chauffeur');
//localhost:3500/Chauffeur
router.get('/', (req, res) => {
        Chauffeur.find((err, doc) => {
            if (!err) {

                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods




router.post('/', storage, (req, res) => {
    const chauffeur = new Chauffeur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        photo: 'http://localhost:3500/images/' + req.body.image,
        disponibilite: req.body.disponibilite,
        permisExp: req.body.permisExp,
        permis: req.body.permis,
        telephone: req.body.telephone,
        password: req.body.password
    });
    try {
        chauffeur.save((err, doc) => {
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
router.get('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with the given : ${req.params.id}`)
        }
        Chauffeur.findById(req.params.id, (err, doc) => {
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
    const chauffeur = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        photo: req.body.photo,
        disponibilite: req.body.disponibilite,
        permisExp: req.body.permisExp,
        permis: req.body.permis,
        telephone: req.body.telephone,
        password: req.body.password
    }
    Chauffeur.findByIdAndUpdate(req.params.id, { $set: chauffeur }, { new: true },
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
    Chauffeur.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;