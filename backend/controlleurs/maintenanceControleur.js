const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Maintenance } = require('../models/Maintenance')
const { pays } = require('../models/pays')
const { ville } = require('../models/ville')
    //localhost:3500/Maintenance
router.get('/', (req, res) => {
        Maintenance.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods

router.post('/', (req, res) => {
    const maint = new Maintenance({
        motif: req.body.motif,
        commentaire: req.body.commentaire,
        vehicule: req.body.vehicule,
        exercice: req.body.exercice,
        cout: req.body.cout

    });
    maint.save((err, doc) => {
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
        Maintenance.findById(req.params.id, (err, doc) => {
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
    const maint = {
        motif: req.body.motif,
        commentaire: req.body.commentaire,
        vehicule: req.body.vehicule,
        exercice: req.body.exercice,
        cout: req.body.cout

    }
    Maintenance.findByIdAndUpdate(req.params.id, { $set: maint }, { new: true },
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
    Maintenance.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;