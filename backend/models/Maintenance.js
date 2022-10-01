const mongoose = require('mongoose')

const Maintenance = mongoose.model('Maintenance', {
    motif: { type: String },
    commentaire: { type: String },
    cout: { type: Number },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule' },
    exercice: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' }
})
module.exports = { Maintenance }