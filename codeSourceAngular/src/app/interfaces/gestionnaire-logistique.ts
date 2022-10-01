import { Depense } from '../models/depense';
export interface GestionnaireLogistique {
    /**
     * Cette interface va contenir les methodes que le gestionnaire de logis
     */

    /**
     * Methodes sur une depense
     */
    ajouterDepense() : boolean;
    supprimerDepense() : boolean;
    modifierDepense() : boolean;
    afficherDepense() : Depense;

    /**
     * Methodes sur une recette
     */
    ajouterRecette() : boolean;
    supprimerRecette() : boolean;
    modifierRecette() : boolean;
    afficherRecette() : Depense;

    /**
     * Sur un bilan 
     */

}
