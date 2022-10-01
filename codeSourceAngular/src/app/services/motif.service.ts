import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotifDepense } from '../models/motif-depense';

@Injectable({
  providedIn: 'root'
})
export class MotifService {

  readonly baseURL = 'http://localhost:3500/motifMission';

  constructor(private http:HttpClient) { }

   /**
 * 
 * @returns Un tableau contenant les informations sur tous les motif des missions
 */
 getDataFromServer():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL);
  
}

/**
 * 
 * @param index l'identifiant du motif
 * @returns Cette methode permettant de recuperer les informations sur un seul motif
 */

getOneMotif(index:object):Observable<any>{

  return this.http.get<any>(this.baseURL+`/${index}`);

}

/**
* 
* @param data est de type motifDepense
* @returns Permet de pouvoir envoyer des donnees à la base de données
*/
sendMotif(data:MotifDepense):Observable<any>{

  return this.http.post<any>(this.baseURL,data);

}


/**
 * 
 * @param data est un motifDepense
 * Cette Methode permet de modifier les informations sur un motif de depense
 */
updateCar(data:MotifDepense):Observable<any>{

  return this.http.put<any>(this.baseURL + `/${data._id}`,data);

}

/**
* 
* @param index c'est l'identifiant du motif de la depense à supprimer
* @returns Cette methode permet de supprimer un motif dans la base de données
*/
deleteCar(index:object):Observable<MotifDepense>{

  return this.http.delete<MotifDepense>(this.baseURL + `/${index}`);

}

}
