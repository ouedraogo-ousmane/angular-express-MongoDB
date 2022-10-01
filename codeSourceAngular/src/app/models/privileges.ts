export class Privileges{

    public name:string;
    public lecture:boolean;
    public ajout:boolean;
    public modification:boolean;
    public suppression:boolean;
    public _id:object;
    public role:object;

    constructor(
        _id:object,
        _name:string,
        _lecture:boolean,
        _ajout:boolean,
        _modification:boolean,
        _suppression:boolean,
        _role:object){
        this.name=_name,
        this.lecture=_lecture,
        this.ajout = _ajout,
        this.modification=_modification,
        this.suppression = _suppression,
        this._id=_id,
        this.role = _role
    }
}