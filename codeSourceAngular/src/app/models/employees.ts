export class Employees {

    constructor(
         _idEmp: number,
         _nomEmp: string,
         _prenomEmp: string,
         _adresseEmp: string,
         _photo: string
    ){
        this.idEmp = _idEmp;
        this.adresseEmp = _adresseEmp;
        this.nomEmp = _nomEmp;
        this.prenomEmp = _prenomEmp;
        this.photo = _photo;

    }
    get idEmp(): number {
        return this.idEmp;
    }
    public set idEmp(value: number) {
        this.idEmp = value;
    }
    
    public get nomEmp(): string {
        return this.nomEmp;
    }
    public set nomEmp(value: string) {
        this.nomEmp = value;
    }

    public get prenomEmp(): string {
        return this.prenomEmp;
    }
    public set prenomEmp(value: string) {
        this.prenomEmp = value;
    }


    
    public get adresseEmp(): string {
        return this.adresseEmp;
    }
    public set adresseEmp(value: string) {
        this.adresseEmp = value;
    }

    public get photo(): string {
        return this.photo;
    }
    public set photo(value: string) {
        this.photo = value;
    }
    

}
