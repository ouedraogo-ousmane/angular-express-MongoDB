export class TypeDepense {

    /**
     *
     */
    constructor(
        _id_type: number,
        _libelle: string
    ) {
        this.id_type = _id_type;
        this.libelle = _libelle;
        
    }

     
    public get id_type(): number {
        return this.id_type;
    }
    public set id_type(value: number) {
        this.id_type = value;
    }


    public get libelle(): string {
        return this.libelle;
    }
    public set libelle(value: string) {
        this.libelle = value;
    }
}
