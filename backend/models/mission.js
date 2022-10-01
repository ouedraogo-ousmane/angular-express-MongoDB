const mongoose = require('mongoose');
const Mission = mongoose.model('Mission', {
    dateProgramm: { type: Date },
    dateMission: { type: Date },
    etat: { type: Boolean },
    trajet: { type: mongoose.Schema.Types.ObjectId, ref: 'Trajet' },
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    chauffeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Chauffeur' },
    exercice: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' },
    motif: { type: mongoose.Schema.Types.ObjectId, ref: 'MotifMission' },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule' }

})

module.exports = { Mission }