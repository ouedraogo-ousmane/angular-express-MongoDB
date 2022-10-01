const express = require('express')
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { InfosRecette } = require('../models/infosRecettes');
const { Produit } = require('../models/produit');
//localhost:3500/InfosRecette
router.get('/', (req, res) => {
        InfosRecette.find((err, doc) => {
            if (!err) {
                res.send(doc);

            } else {
                console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
            }
        })

    })
    //post methods




router.post('/', (req, res) => {
    var infos = new InfosRecette({
        idProduit: req.body.idProduit,
        coutUnitaire: req.body.coutUnitaire,
        dateEnVigueur: req.body.dateEnVigueur

    })
    infos.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })

})

/**
 * Methode de jointure entre le document produit et infosRecette
 * 
 */
router.get('/produitData', async(req, res) => {
    let tableData = [];
    const infosRecette = await InfosRecette.find({});

    for (let i = 0; i < infosRecette.length; i++) {
        let produit = await Produit.findOne({ _id: infosRecette[i].idProduit });

        let data = {
            _id: infosRecette[i]._id,
            idProduit: infosRecette[i].idProduit,
            unite: produit.unite,
            name: produit.designation,
            coutUnitaire: infosRecette[i].coutUnitaire,
            dateEnVigueur: infosRecette[i].dateEnVigueur,

        }
        tableData.push(data);

    }

    res.send(tableData);
    //console.log(tableData);


});
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with the given : ${req.params.id}`)
    }
    InfosRecette.findById(req.params.id, (err, doc) => {
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
        return res.status(400).send(`No record in the given : ${req.params.id}`);
    }
    var infos = {
        idProduit: req.body.idProduit,
        coutUnitaire: req.body.coutUnitaire,
        dateEnVigueur: req.body.dateEnVigueur
    };
    InfosRecette.findByIdAndUpdate(req.params.id, { $set: infos }, { new: true },
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
    InfosRecette.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            console.log('Erreur lors du chargement' + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router;