import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../models/trajet';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  readonly baseURL = 'http://localhost:3500/trajet';
  readonly baseURL1  = 'http://localhost:3500/trajet/trajetFullInfos';

  constructor(private http:HttpClient) { 
    
  }

  /**
 * 
 * @returns Un tableau contenant les informations sur tous les trajets
 */
 getDataFromServer():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL1);
  
}

/**
 * 
 * @param index l'identifiant du trajet
 * @returns Cette methode permettant de recuperer les informations sur un seul trajet
 */

getOneTrajet(index:object):Observable<any>{

  return this.http.get<any>(this.baseURL+`/${index}`);

}

/**
* 
* @param data est de type Trajet
* @returns Permet de pouvoir envoyer des donnees à la base de données
*/
sendTrajet(data:Trajet):Observable<any>{

  return this.http.post<any>(this.baseURL,data);

}


/**
 * 
 * @param data est un produit
 * Cette Methode permet de modifier les informations sur un Trajet
 */
updateTrajet(data:Trajet):Observable<any>{

  return this.http.put<any>(this.baseURL + `/${data._id}`,data);

}

/**
* 
* @param index c'est l'identifiant du Trajet à supprimer
* @returns Cette methode permet de supprimer un Trajet dans la base de données
*/
deleteTrajet(index:object):Observable<Trajet>{

  return this.http.delete<Trajet>(this.baseURL + `/${index}`);

}
}
