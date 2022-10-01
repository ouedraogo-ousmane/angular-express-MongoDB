
export class Account {
    public _id?:object;
    public email:string;
    public password:string;
    public telephone:string;
    public prenom: string;
    public nom: string;
    public role:object;


    /**
     *
     */
    constructor(
        _id: object,
        _email: string,
        _telephone: string,
        _password: string,
        _nom: string,
        _prenom: string,
        _role:object
    ) {

        this._id = _id;
        this.email = _email;
        this.telephone = _telephone;
        this.password = _password;
        this.nom = _nom;
        this.prenom = _prenom;
        this.role=_role;
    
    }

/*
    public get _id(): object {
        return this._id;
    }
    public set _id(value: object) {
        this._id = value;
    }



    public get email(): string {
        return this.email;
    }
    public set email(value: string) {
        this.email = value;
    }



    public get telephone(): string {
        return this.telephone;
    }
    public set telephone(value: string) {
        this.telephone = value;
    }



    public get password(): string {
        return this.password;
    }
    public set password(value: string) {
        this.password = value;
    }
*/
    
}
