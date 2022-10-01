export class Exercice {

    /**
     *
     */

   constructor(
       public _id: object,
       public dateDebut: Date,
       public dateFin: Date,
       public etat : boolean,
       public responsable: object,

    ) { }

}
