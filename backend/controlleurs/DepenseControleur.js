const express = require('express');
var router = express.Router();
const { Depense } = require('../models/depense');
const { Vehicule } = require('../models/vehicule');
//const { Mission } = require('../models/mission');
const ObjectId = require('mongoose').Types.ObjectId;

//localhost:3500/Depense
router.get('/', (req, res) => {
        Depense.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.get('/missionsTableData', async(req, res) => {

        let DepenseData = await Depense.find({});

        let tableData = [];

        for (let i = 0; i < DepenseData.length; i++) {
            //let mission = await Mission.findOne({_id:DepenseData[i].mission});
            //  let vehicule = await Vehicule.findOne({ _id: mission.vehicule });

            let data = {
                _id: DepenseData[i]._id,
                libelle: DepenseData[i].libelle,
                montant: DepenseData[i].montant,
                // missionId: DepenseData[i].mission,
                date: DepenseData[i].date,
                // mission:mission.immatriculation,
                //vehicule: vehicule.immatriculation
            }
            tableData.push(data);

        }
        // console.log(tableData);
        res.send(tableData);
    })
    /**
     * Methode post
     */
router.post('/', (req, res) => {
    const depense = new Depense({
        libelle: req.body.libelle,
        montant: req.body.montant,
        date: req.body.date,
        mission: req.body.mission
    })
    depense.save((err, doc) => {
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
        Depense.findById(req.params.id, (err, doc) => {
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
    const depense = {
        libelle: req.body.libelle,
        montant: req.body.montant,
        date: req.body.date,
        mission: req.body.mission

    };
    Depense.findByIdAndUpdate(req.params.id, { $set: depense }, { new: true },
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
    Depense.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;