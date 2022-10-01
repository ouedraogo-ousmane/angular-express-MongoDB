import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  readonly baseURL = 'http://localhost:3500/maintenance';


  constructor(
    private http:HttpClient
  ) { }

  
    
  /**
   * 
   * @returns Un tableau contenant les informations sur toutes les maintenances
   */
   getDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  /**
   * 
   * @param index l'identifiant de la maintenance
   * @returns Cette methode permettant de recuperer les informations sur une seule maintenance
   */

  getOneMaintenance(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

  /**
  * 
  * @param data est de type Maintenance
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
  sendMaintenance(data:Maintenance):Observable<Maintenance>{

    return this.http.post<Maintenance>(this.baseURL,data);

  }


  /**
   * 
   * @param data est une maintenance
   * Cette Methode permet de modifier les informations sur une maintenance
   */
  updateMaintenance(data:Maintenance):Observable<Maintenance>{

    return this.http.put<Maintenance>(this.baseURL + `/${data._id}`,data);

  }


  /**
  * 
  * @param data c'est l'identifiant de la piece à supprimer
  * @returns Cette methode permet de supprimer une maintenance dans la base de données
  */
  deleteMaintenance(data:object):Observable<Maintenance>{

    return this.http.delete<Maintenance>(this.baseURL + `/${data}`);

  }
}
