const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Enregistrement } = require('../models/Enregistrement')
const { Vehicule } = require('../models/vehicule');
const { Piece } = require('../models/pieces');
const { Maintenance } = require('../models/Maintenance');


//localhost:3500/Enregistrement
router.get('/', (req, res) => {
        Enregistrement.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.get('/getAllData', async(req, res) => {
    const enregistrement = await Enregistrement.find({});
    let maintenanceListe = [];
    for (let i = 0; i < enregistrement.length; i++) {
        let pieceData = await Piece.findOne({ _id: enregistrement[i].piece });
        let maintenanceData = await Maintenance.findOne({ _id: enregistrement[i].activite });
        let vehiculeData = await Vehicule.findOne({ _id: maintenanceData.vehicule });
        let data = {
            _id: enregistrement[i]._id,
            vehicule: vehiculeData.immatriculation,
            vehiculeId: vehiculeData._id,
            motif: maintenanceData.motif,
            dateEntree: enregistrement[i].dateEntree,
            piece: pieceData.nom,
            quantite: enregistrement[i].quantite,
            montant: enregistrement[i].montant,
            cout: maintenanceData.cout,
            idMaintenance: maintenanceData._id,
            idPiece: pieceData._id

        }

        maintenanceListe.push(data);
    }
    res.send(maintenanceListe);
    console.log(maintenanceListe);



})

router.post('/', (req, res) => {
    const enregistrement = new Enregistrement({
        dateEntree: req.body.dateEntree,
        quantite: req.body.quantite,
        activite: req.body.activite,
        piece: req.body.piece,
        montant: req.body.montant


    })
    enregistrement.save((err, doc) => {
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
        Enregistrement.findById(req.params.id, (err, doc) => {
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
    const enregistrement = {
        dateEntree: req.body.dateEntree,
        quantite: req.body.quantite,
        activite: req.body.activite,
        piece: req.body.piece,
        montant: req.body.montant
    }
    Enregistrement.findByIdAndUpdate(req.params.id, { $set: enregistrement }, { new: true },
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
    Enregistrement.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;