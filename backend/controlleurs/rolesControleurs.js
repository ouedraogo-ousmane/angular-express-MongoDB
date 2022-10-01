const express = require('express');
const bcrypt = require("bcrypt");
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { Roles } = require('../models/roles');

router.get('/', (req, res) => {

    Roles.find((err, doc) => {

        if (!err) {

            res.send(doc); // envoi des données dans doc

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    });

});

//post methods

router.post('/adding', (req, res) => {
    const roles = new Roles({
        nom: req.body.nom,
        code: req.body.code,
        operations: req.body.operations,

    });
    roles.save((err, doc) => {
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
    Roles.findById(req.params.id, (err, doc) => {

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
    const roles = new Roles({
        nom: req.body.nom,
        code: req.body.code,
        operations: req.body.operations

    });
    Roles.findByIdAndUpdate(req.params.id, { $set: roles }, { new: true },

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
    Roles.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router;