export class Enregistrement {

    /**
     *dateEntree: { type: Date },
    quantite: { type: Number },
    montant: { type: Number },
    activite: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance' },
    piece: { type: mongoose.Schema.Types.ObjectId, ref: 'piece' }
     */
    constructor(
       public _id: object,
       public dateEntree: Date,
       public quantite: number,
       public montant: number,
       public activite: object,
       public piece:object


    ) {
        
        
    }

  
}
