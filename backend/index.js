const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { mongoose } = require('./connexion');
const path = require('path');
const app = express();

//Declarations des variables des differents controleurs

const villeControleur = require('./controlleurs/villeControleur');
const paysControleur = require('./controlleurs/paysControleur');
const trajetControleur = require('./controlleurs/trajetControleur');
const clientControleur = require('./controlleurs/ClientControleur');
const documentControleur = require('./controlleurs/documentControleur');
const enregistrementControleur = require('./controlleurs/EnregistrementControleur')
const entrepriseControleur = require('./controlleurs/EntrepriseControleur');
const motifControleur = require('./controlleurs/motifMissionControleur');
const exerciceControleur = require('./controlleurs/ExerciceControleur')
const chauffeurControleur = require('./controlleurs/chauffeurControleur');
const depenseControleur = require('./controlleurs/DepenseControleur');
const infosRecette = require('./controlleurs/infosRecetteControleur');
const maintenanceControleur = require('./controlleurs/maintenanceControleur');
const particulierControleur = require('./controlleurs/particulierControleur');
const pieceControleur = require('./controlleurs/pieceControleur');
const produitControleur = require('./controlleurs/produitControleur');
const responsableControleur = require('./controlleurs/responsableControleur');
const rPesageControleur = require('./controlleurs/RpesageControleur');
const rTransportControleur = require('./controlleurs/RtransportControleur');
const typeDepenseControleur = require('./controlleurs/typeDepenseControleur');
const missionControleur = require('./controlleurs/missionControleur');
const userControleur = require('./controlleurs/userControleur');
const accountControleur = require('./controlleurs/AccountControleur');
const rolesControleur = require('./controlleurs/rolesControleurs');
const privilegeControleur = require('./controlleurs/privilegesControleur');
const vehiculeControleur = require('./controlleurs/vehiculeControleur');


// Declarations des middlewares de l'application
app.use('/images', express.static(path.join('images')));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }))
app.use('/chauffeur', chauffeurControleur);
app.use('/depense', depenseControleur);
app.use('/infosRecette', infosRecette);
app.use('/maintenance', maintenanceControleur);
app.use('/ville', villeControleur);
app.use('/pays', paysControleur);
app.use('/trajet', trajetControleur);
app.use('/client', clientControleur);
app.use('/document', documentControleur);
app.use('/enregistrement', enregistrementControleur);
app.use('/entreprise', entrepriseControleur);
app.use('/motifMission', motifControleur);
app.use('/exercices', exerciceControleur);
app.use('/particulier', particulierControleur);
app.use('/piece', pieceControleur);
app.use('/produit', produitControleur);
app.use('/responsable', responsableControleur);
app.use('/recettePesage', rPesageControleur);
app.use('/recetteTransport', rTransportControleur);
app.use('/typeDepense', typeDepenseControleur);
app.use('/mission', missionControleur);
app.use('/users', userControleur);
app.use('/account', accountControleur);
app.use('/roles', rolesControleur);
app.use('/privileges', privilegeControleur);
app.use('/vehicules', vehiculeControleur);

app.listen(3500, () => {
    console.log("Serveur executé au port 3500");
})