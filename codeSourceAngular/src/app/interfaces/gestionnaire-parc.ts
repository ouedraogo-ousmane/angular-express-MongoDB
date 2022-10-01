import { PieceEchangee } from '../models/piece-echangee';
import { Mission } from '../models/mission';
export interface GestionnaireParc {

    /***
     * Les methodes sur une piece
     */

    ajouterPiece(): boolean;
    supprimerPiece(): boolean;
    afficherPiece(): PieceEchangee;
    rechercherPiece() : void;
    modifierPiece() : boolean;

    /**
     * Les methodes sur la programmation
     */
    ajouterProgrammation() : boolean;
    supprimerProgrammation() : boolean;
    afficherProgrammation() : Mission;
    rechercherProgrammation() : void;
    modifierProgrammation() : boolean;

}
