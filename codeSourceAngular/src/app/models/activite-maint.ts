export class ActiviteMaint {
    constructor(

         _id_activite : number,
         _motif_maint : string,
         _commentaire : string
    ){
        this.id_activite = _id_activite;
        this.motif_maint = _motif_maint;
        this.commentaire = _commentaire;
  
    }

    
    public get id_activite(): number {
        return this.id_activite;
    }
    public set id_activite(value: number) {
        this.id_activite = value;
    }

    
    public get motif_maint(): string {
        return this.motif_maint;
    }
    public set motif_maint(value: string) {
        this.motif_maint = value;
    }

    public get commentaire(): string {
        return this.commentaire;
    }
    public set commentaire(value: string) {
        this.commentaire = value;
    }
}
