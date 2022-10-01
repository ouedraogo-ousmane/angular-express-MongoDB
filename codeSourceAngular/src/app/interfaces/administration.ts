import { Chauffeur } from "../models/chauffeur";
import { Vehicules } from "../models/vehicules";

export interface Administration {
    /**
 * les methodes sur un vehicule
 */
     afficherVehicule() : Vehicules;
     ajouterVehicule(): void;
     supprimerVehicule(): void;
     rechercherVehicule() : void;
     modifierVehicule() : void;
 
     /***
      * Les methodes sur un Chauffeur
      */
     ajouterChauffeur(): boolean;
     supprimerChauffeur(): boolean;
     afficherChauffeur(): Chauffeur;
     rechercherChauffeur() : void;
     modifierChauffeur() : boolean;
 
}
