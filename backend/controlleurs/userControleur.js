const express = require('express')
var router = express.Router();
const { User } = require('../models/users')
    //localhost:3500/User
router.get('/', (req, res) => {
        User.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods




router.post('/', (req, res) => {
    var user = new User({
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password

    })
    user.save((err, doc) => {
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
        User.findById(req.params.id, (err, doc) => {
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
    var user = {
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password
    }
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true },
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
    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;