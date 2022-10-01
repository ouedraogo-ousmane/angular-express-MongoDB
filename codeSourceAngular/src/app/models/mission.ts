export class Mission {

    /**
     *
     */
    public _id:object;
    public vehicule:object;
    public trajet: object;
    public produit: object;
    public chauffeur: object;
    public exercice: object;
    public motif: object;
    public dateProgramm: Date=new Date();
    public dateMission: Date;
    public etat: boolean=false;
    constructor(
        _id: object,
        _dateProgramm: Date,
        _dateMission: Date,
        _etat: boolean,
        _trajet:object,
        _vehicule:object,
        _produit:object,
        _exercice:object,
        _motif:object,
        _chauffeur:object

    ) {

        this._id=_id;
        this.chauffeur=_chauffeur;
        this.dateMission=_dateMission;
        this.dateProgramm=_dateProgramm;
        this.etat=_etat;
        this.exercice=_exercice;
        this.trajet=_trajet;
        this.vehicule=_vehicule;
        this.motif=_motif;
        this.produit=_produit;

        
        
    }

}
