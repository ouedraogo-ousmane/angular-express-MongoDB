export class Operations {

    /**
     *
     */
    constructor(
        _nom: string,
        _read: boolean,
        _write: boolean,
        _update: boolean
    ) {

        this.nom = _nom;
        this.read = _read;
        this.write = _write;
        this.update = _update;

    }


    public get nom(): string {
        return this.nom;
    }
    public set nom(value: string) {
        this.nom = value;
    }



    public get read(): boolean {
        return this.read;
    }
    public set read(value: boolean) {
        this.read = value;
    }



    public get write(): boolean {
        return this.write;
    }
    public set write(value: boolean) {
        this.write = value;
    }



    public get update(): boolean {
        return this.update;
    }
    public set update(value: boolean) {
        this.update = value;
    }
}
