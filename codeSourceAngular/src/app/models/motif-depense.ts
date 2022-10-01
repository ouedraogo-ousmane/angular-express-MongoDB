export class MotifDepense {

    /**
     *
     */
    constructor(
        _id: object,
        _intitule: string
    ) {
        this._id = _id;
        this.intitule = _intitule;
        
    }

     
    public get _id(): object {
        return this._id;
    }
    public set _id(value: object) {
        this._id = value;
    }


     
    public get intitule(): string {
        return this.intitule;
    }
    public set intitule(value: string) {
        this.intitule = value;
    }
}
