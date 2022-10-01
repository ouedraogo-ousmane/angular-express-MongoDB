export class RecetteTransport {
    /**
     * 
     */
    constructor(
        public _id         : object,
        public quantite    : number,
        public coutUnitaire: number,
        public dateEntree  : Date,
        public idProduit   : object,
        public idClient    : object,
        public idMission   : object
    ) {
 
        
    }

}
