import { Administration } from "../interfaces/administration";
import { Chauffeur } from "../models/chauffeur";
import { Vehicules } from "../models/vehicules";

export class IAdministration implements Administration{
    afficherVehicule(): Vehicules {
        throw new Error("Method not implemented.");
    }
    ajouterVehicule(): void {
        throw new Error("Method not implemented.");
    }
    supprimerVehicule(): void {
        throw new Error("Method not implemented.");
    }
    rechercherVehicule(): void {
        throw new Error("Method not implemented.");
    }
    modifierVehicule(): void {
        throw new Error("Method not implemented.");
    }
    ajouterChauffeur(): boolean {
        throw new Error("Method not implemented.");
    }
    supprimerChauffeur(): boolean {
        throw new Error("Method not implemented.");
    }
    afficherChauffeur(): Chauffeur {
        throw new Error("Method not implemented.");
    }
    rechercherChauffeur(): void {
        throw new Error("Method not implemented.");
    }
    modifierChauffeur(): boolean {
        throw new Error("Method not implemented.");
    }
}
