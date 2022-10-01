import { Exercice } from './exercice';
export class Maintenance{

    /**
     * Cette classe concerne toutes les activités de maintenances
     * 
     * motif: { type: String },
    commentaire: { type: String },
    cout: { type: Number },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule' },
    exercice: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' }
     */

    constructor(
        public _id:object,
        public motif:string,
        public commentaire:string,
        public cout:number,
        public vehicule:object,
        public exercice:object

    ){

    }
}