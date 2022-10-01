const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Privileges } = require('../models/privileges');

router.get('/', (req, res) => {

    Privileges.find((err, doc) => {

        if (!err) {

            res.send(doc); // envoi des données dans doc

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });

});

//post methods

router.post('/adding', (req, res) => {
    const privilege = new Privileges({
        name: req.body.name,
        lecture: req.body.lecture,
        ajout: req.body.ajout,
        modification: req.params.modification,
        suppression: req.params.suppression,
        role: req.params.role

    });
    privilege.save((err, doc) => {
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
    Privileges.findById(req.params.id, (err, doc) => {

        if (!err) {

            res.send(doc);

        } else {

            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }

    })

})

//Updating data on role

router.put('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {

        return res.status(400).send(`No record in the given : ${req.params.id}`)

    }
    const privilege = {
        name: req.body.name,
        lecture: req.body.lecture,
        ajout: req.body.ajout,
        modification: req.body.modification,
        suppression: req.body.suppression,
        role: req.body.role

    };
    Privileges.findByIdAndUpdate(req.params.id, { $set: privilege }, { new: true },

        (err, doc) => {
            if (!err) {

                res.send(doc);
                //res.send("sucessfully");

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
    Privileges.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router;