const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Mission } = require('../models/Mission');
const { Chauffeur } = require('../models/chauffeur');
const { MotifMission } = require('../models/motifMission');
const { Produit } = require('../models/produit');
const { Trajet } = require('../models/trajet');
const { Vehicule } = require('../models/vehicule');
const { Ville } = require('../models/ville');
//localhost:3500/Mission
router.get('/', (req, res) => {
        Mission.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.get('/missionsTableData', async(req, res) => {
    let data = await Mission.find({});
    let missionListe = [];

    for (let i = 0; i < data.length; i++) {

        let trajetData = await Trajet.findOne({ _id: data[i].trajet });
        let villeA = await Ville.findOne({ _id: trajetData.villeA });
        let villeD = await Ville.findOne({ _id: trajetData.villeD });
        let produitData = await Produit.findOne({ _id: data[i].produit });
        let vehiculeData = await Vehicule.findOne({ _id: data[i].vehicule });
        let chauffeurData = await Chauffeur.findOne({ _id: data[i].chauffeur });
        let motifData = await MotifMission.findOne({ _id: data[i].motif });
        let mission = {
            _id: data[i]._id,
            trajet: data[i].trajet,
            //trajetName: villeA.nom + " - " + villeD.nom,
            vehiculeId: vehiculeData._id,
            immatriculation: vehiculeData.immatriculation,
            chauffeurId: chauffeurData._id,
            chauffeur: chauffeurData.nom + " " + chauffeurData.prenom,
            motifId: motifData._id,
            motif: motifData.intitule,
            productId: produitData._id,
            produit: produitData.designation,
            unite: produitData.unite

        }


        missionListe.push(mission);
    }
    res.send(missionListe);
    console.log(missionListe);
})


router.post('/', (req, res) => {

    var mission = new Mission({
        trajet: req.body.trajet,
        produit: req.body.produit,
        chauffeur: req.body.chauffeur,
        vehicule: req.body.vehicule,
        exercice: req.body.exercice,
        motif: req.body.motif,
        dateProgramm: req.body.dateProgramm,
        dateMission: req.body.dateMission,
        etat: req.body.etat,
    })
    mission.save((err, doc) => {
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
        Mission.findById(req.params.id, (err, doc) => {
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
    var mission = {
        trajet: req.body.trajet,
        produit: req.body.produit,
        chauffeur: req.body.chauffeur,
        vehicule: req.body.vehicule,
        exercice: req.body.exercice,
        motif: req.body.motif,
        dateProgramm: req.body.dateProgramm,
        dateMission: req.body.dateMission,
        etat: req.body.etat,
    };
    Mission.findByIdAndUpdate(req.params.id, { $set: mission }, { new: true },
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
    Mission.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;