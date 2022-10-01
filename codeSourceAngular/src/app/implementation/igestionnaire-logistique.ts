import { GestionnaireLogistique } from "../interfaces/gestionnaire-logistique";
import { Depense } from "../models/depense";

export class IgestionnaireLogistique implements GestionnaireLogistique {
    ajouterDepense(): boolean {
        throw new Error("Method not implemented.");
    }
    supprimerDepense(): boolean {
        throw new Error("Method not implemented.");
    }
    modifierDepense(): boolean {
        throw new Error("Method not implemented.");
    }
    afficherDepense(): Depense {
        throw new Error("Method not implemented.");
    }
    ajouterRecette(): boolean {
        throw new Error("Method not implemented.");
    }
    supprimerRecette(): boolean {
        throw new Error("Method not implemented.");
    }
    modifierRecette(): boolean {
        throw new Error("Method not implemented.");
    }
    afficherRecette(): Depense {
        throw new Error("Method not implemented.");
    }

}
