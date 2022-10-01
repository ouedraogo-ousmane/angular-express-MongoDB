import { RecetteTransport } from './recette-transport';
export class RecettePesage  {

    /**
     *
     */
    constructor(
        public _id         : object,
        public numPesee    : number,
        public poids1      : number,
        public poids2      : number,
        public idProduit   : object,
        public idClient    : object,
        public idMission   : object,
        public coutUnitaire: number,
        public dateEntree : Date

    ) {
        
        
    }

    

}
