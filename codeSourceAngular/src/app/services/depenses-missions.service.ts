import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../models/depense';

@Injectable({
  providedIn: 'root'
})
export class DepensesMissionsService {

  readonly baseURL = 'http://localhost:3500/depense';
  readonly baseURL1 = 'http://localhost:3500/mission/missionsTableData';

    
  constructor(private http:HttpClient)
  { 
    
  }

    
  /**
   * 
   * @returns Un tableau contenant les informations sur toutes les Depenses
   */
    getDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  /**
   * 
   * @param index l'identifiant de la Depense
   * @returns Cette methode permettant de recuperer les informations sur une seule Depense
   */

  getOneDepense(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

  /**
   * 
   * @returns recuperations des données du tableau des depenses missions
   */
  getTableData():Observable<any>{
    return this.http.get<any[]>(this.baseURL1);

  }

  /**
  * 
  * @param data est de type Depense
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
  sendDepense(data:Depense):Observable<Depense>{

    return this.http.post<Depense>(this.baseURL,data);

  }


  /**
   * 
   * @param data est une Depense
   * Cette Methode permet de modifier les informations sur une Depense
   */
  updateDepense(data:Depense):Observable<Depense>{

    return this.http.put<Depense>(this.baseURL + `/${data._id}`,data);

  }


  /**
  * 
  * @param data c'est l'identifiant de la depense à supprimer
  * @returns Cette methode permet de supprimer une Depense dans la base de données
  */
  deleteDepense(data:object):Observable<Depense>{

    return this.http.delete<Depense>(this.baseURL + `/${data}`);

  }
}
