import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enregistrement } from '../models/enregistrement'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnregistrementService {

  readonly baseURL = 'http://localhost:3500/enregistrement';
  readonly baseURL1 = 'http://localhost:3500/enregistrement/getAllData';

  


  constructor(private http:HttpClient) { }

    
  /**
   * 
   * @returns Un tableau contenant les informations sur tous les Enregistrements
   */
   getDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  getAllMaintenanceData():Observable<any[]>{
    return this.http.get<any[]>(this.baseURL1);
  }

  /**
   * 
   * @param index l'identifiant d'un enregistrement d'une activite de maintenance
   * @returns Cette methode permettant de recuperer les informations sur un enregistrement d'activite
   */

  getOneEnregistrement(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

  /**
  * 
  * @param data est de type Enregistrement
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
  sendEnregistrement(data:Enregistrement):Observable<Enregistrement>{

    return this.http.post<Enregistrement>(this.baseURL,data);

  }


  /**
   * 
   * @param data est un Enregistrement
   * Cette Methode permet de modifier les informations sur un enregistrement
   */
  updateEnregistrement(data:Enregistrement):Observable<Enregistrement>{

    return this.http.put<Enregistrement>(this.baseURL + `/${data._id}`,data);

  }


  /**
  * 
  * @param data c'est l'identifiant de l'enregistrement à supprimer
  * @returns Cette methode permet de supprimer un enregistrement dans la base de données
  */
  deleteEnregistrement(data:object):Observable<Enregistrement>{

    return this.http.delete<Enregistrement>(this.baseURL + `/${data}`);

  }
}
