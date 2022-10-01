const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Trajet } = require('../models/trajet')
const { Pays } = require('../models/pays')
const { Ville } = require('../models/ville');
//localhost:3500/Trajet
router.get('/', (req, res) => {
    Trajet.find((err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })

})

router.get('/trajetFullInfos', async(req, res) => {
        let data = await Trajet.find({});

        let trajetListe = [];


        for (let i = 0; i < data.length; i++) {
            let depart = await Ville.findOne({ _id: data[i].villeDepart })
            let arrivee = await Ville.findOne({ _id: data[i].villeDestination })
            let trajet = {
                type: data[i].type,
                distance: data[i].distance,
                villeDepart: data[i].villeDepart,
                paysDepart: data[i].paysDepart,
                villeDestination: data[i].villeDestination,
                paysDestination: data[i].paysDestination,
                departVilleNom: depart.nom,
                DestinationVilleNom: arrivee.nom

            }
            trajetListe.push(trajet);
        }
        res.send(trajetListe);

    })
    //post methods

router.post('/', (req, res) => {
    const trajet = new Trajet({
        type: req.body.type,
        distance: req.body.distance,
        villeA: req.body.villeA,
        paysDepart: req.body.paysDepart,
        villeD: req.body.villeD,
        paysDestination: req.body.paysDestination,
    })
    trajet.save((err, doc) => {
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
        Trajet.findById(req.params.id, (err, doc) => {
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
    const trajet = {
        type: req.body.type,
        distance: req.body.distance,
        villeA: req.body.villeA,
        paysDepart: req.body.paysDepart,
        villeD: req.body.villeD,
        paysDestination: req.body.paysDestination,
    }
    Trajet.findByIdAndUpdate(req.params.id, { $set: trajet }, { new: true },
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
    Trajet.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;