import { GestionnaireParc } from "../interfaces/gestionnaire-parc";
import { Chauffeur } from "../models/chauffeur";
import { Mission } from "../models/mission";
import { PieceEchangee } from "../models/piece-echangee";
import { Vehicules } from "../models/vehicules";

export class IgestionnaireParc implements GestionnaireParc {
    genererBilan(): boolean {
        throw new Error("Method not implemented.");
    }
    imprimer(): boolean {
        throw new Error("Method not implemented.");
    }
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
    supprimerChauffeur(id:number): boolean {
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
    ajouterPiece(): boolean {
        throw new Error("Method not implemented.");
    }
    supprimerPiece(): boolean {
        throw new Error("Method not implemented.");
    }
    afficherPiece(): PieceEchangee {
        throw new Error("Method not implemented.");
    }
    rechercherPiece(): void {
        throw new Error("Method not implemented.");
    }
    modifierPiece(): boolean {
        throw new Error("Method not implemented.");
    }
    ajouterProgrammation(): boolean {
        throw new Error("Method not implemented.");
    }
    supprimerProgrammation(): boolean {
        throw new Error("Method not implemented.");
    }
    afficherProgrammation(): Mission {
        let mission = new Mission(0,new Date(),new Date(),false);
        return mission;
    }
    rechercherProgrammation(): void {
        
    }
    modifierProgrammation(): boolean {
        return false;
    }
}
