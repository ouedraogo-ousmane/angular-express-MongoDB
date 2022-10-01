export class Responsable {

    /**
     * Cette classe permet de definir le model d'un responsable
     */
    constructor(
        _id: object,
        _email: string,
        _nom: string,
        _prenom: string,
        _adresse: string,
        _photo: string
    ) {
        this._id = _id;
        this.email = _email;
        this.nom = _nom;
        this.prenom = _prenom;
        this.adresse = _adresse;
        this.photo = this.photo;
        
        
    }

    public get _id(): object {
        return this._id;
    }
    public set _id(value: object) {
        this._id = value;
    }
    public get nom():string{
        return this.nom;
    }
    public set nom(value : string){
        this.nom = value;
    }
    public get prenom():string{
        return this.prenom;
    }
    public set prenom(value : string){
        this.prenom = value;
    }
    public get photo():string{
        return this.photo;
    }
    public set photo(value : string){
        this.photo = value;
    }
    public get adresse():string{
        return this.adresse;
    }
    public set adresse(value : string){
        this.adresse = value;
    }
           
    public get email(): string {
        return this.email;
    }
    public set email(value: string) {
        this.email = value;
    }
    /**
     * toString
     */

    
}
