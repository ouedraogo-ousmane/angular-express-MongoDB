const mongoose = require('mongoose');

//Permet de stocker des constantes
const dotenv = require('dotenv');

dotenv.config();

const url = "mongodb://localhost:27017/WendPanga";
/*mongoose.connect(process.env.DB_CONNECT, (err) => {
        if (!err) {
            console.log("Connexion à la base de données reussie");
        } else {
            console.log("connexion échouée");
        }
    })
    */
mongoose.connect(url, (err) => {
    if (!err) {
        console.log("Connexion à la base de données reussie");
    } else {
        console.log("connexion échouée");
    }
})
module.exports = mongoose;