const mongoose = require('mongoose');


const Privileges = mongoose.model('Privileges', {

    name: {
        type: String
    },
    lecture: {
        type: Boolean
    },
    ajout: {
        type: Boolean
    },
    modification: {
        type: Boolean
    },
    suppression: {
        type: Boolean
    },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }

    /**
     * operations: new Operation({ nom: "", write: false, read: false, update: false })
     *  
     */
});

module.exports = { Privileges };