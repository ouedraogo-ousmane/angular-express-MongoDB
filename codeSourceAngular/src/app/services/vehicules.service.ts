import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicules } from '../models/vehicules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {

  readonly baseURL = 'http://localhost:3500/vehicules';

  constructor(private http:HttpClient) { }

    
  /**
   * 
   * @returns Un tableau contenant les informations sur tous les vehicules
   */
  getDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  /**
   * 
   * @param index l'identifiant du vehicule
   * @returns Cette methode permettant de recuperer les informations sur un seul vehicule
   */

  getOneCar(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

  /**
  * 
  * @param data est de type vehicule
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
  sendCar(data:Vehicules):Observable<any>{

    return this.http.post<any>(this.baseURL,data);

  }


  /**
   * 
   * @param data est un vehicule
   * Cette Methode permet de modifier les informations sur un vehicule
   */
  updateCar(data:Vehicules):Observable<Vehicules>{

    return this.http.put<Vehicules>(this.baseURL + `/${data._id}`,data);

  }

  /**
  * 
  * @param index c'est l'identifiant du vehicule à supprimer
  * @returns Cette methode permet de supprimer un vehicule dans la base de données
  */
  deleteCar(data:Vehicules):Observable<Vehicules>{

    return this.http.delete<Vehicules>(this.baseURL + `/${data._id}`);

  }


}
