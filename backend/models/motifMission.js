const mongoose = require('mongoose');

const MotifMission = mongoose.model('MotifMission', {
    intitule: { type: String }
});
module.exports = { MotifMission }