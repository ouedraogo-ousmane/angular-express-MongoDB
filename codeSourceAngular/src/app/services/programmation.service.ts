import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class ProgrammationService {

  readonly baseURL = 'http://localhost:3500/mission';

  constructor(private http:HttpClient) { }

  /**
   * 
   * @returns toutes les données du document mission
   */

  getAllVoyage():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
  }

  /**
   * 
   * @param newdata la nouvelle missions
   * @returns Cette methode permet d'envoyer des données dans le document mission
   */

  sendDataToVoyage(newdata:Mission):Observable<any>{

    return this.http.post(this.baseURL,newdata);
  }

  /**
   * 
   * @param newdata la nouvelle donnée pour la mise à jour
   * @returns permet de modifier une donnée
   */
  updateDataToVoyage(newdata:Mission):Observable<any>{

    return this.http.put(this.baseURL + `/${newdata._id}`,newdata);
  }

  deleteDataFromVoyage(data:Mission):Observable<any>{

    return this.http.delete(this.baseURL + `/${data._id}`);
  }
}
