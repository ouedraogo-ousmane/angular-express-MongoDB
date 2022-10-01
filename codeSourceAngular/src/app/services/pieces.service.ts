import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PieceEchangee } from '../models/piece-echangee';

@Injectable({
  providedIn: 'root'
})
export class PiecesService {

  
  readonly baseURL = 'http://localhost:3500/piece';

  constructor(private http:HttpClient) { }

    
  /**
   * 
   * @returns Un tableau contenant les informations sur tous les PieceEchangee
   */
   getDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  /**
   * 
   * @param index l'identifiant de la piece
   * @returns Cette methode permettant de recuperer les informations sur une seule piece echangée
   */

  getOnePiece(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

  /**
  * 
  * @param data est de type PieceEchangee
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
  sendPiece(data:PieceEchangee):Observable<PieceEchangee>{

    return this.http.post<PieceEchangee>(this.baseURL,data);

  }


  /**
   * 
   * @param data est un PieceEchangee
   * Cette Methode permet de modifier les informations sur une Piece Echangee
   */
  updatePiece(data:PieceEchangee):Observable<PieceEchangee>{

    return this.http.put<PieceEchangee>(this.baseURL + `/${data._id}`,data);

  }


  /**
  * 
  * @param data c'est l'identifiant de la piece à supprimer
  * @returns Cette methode permet de supprimer une piece dans la base de données
  */
  deletePiece(data:object):Observable<PieceEchangee>{

    return this.http.delete<PieceEchangee>(this.baseURL + `/${data}`);

  }
}
