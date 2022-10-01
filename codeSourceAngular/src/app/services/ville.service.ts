import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ville } from '../models/ville';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  /**
   * Declaration des routes
   */
  readonly baseURL = 'http://localhost:3500/ville';
  readonly baseURL2 = 'http://localhost:3500/pays';
  readonly baseURL1 = 'http://localhost:3500/ville/citiesAndCountries';


  constructor(private http:HttpClient) { }

      /**
     *
     * @returns Un tableau contenant les informations sur toutes les Villes
     */
    getDataFromServer():Observable<any[]>{
      return this.http.get<any[]>(this.baseURL);
    }
    /**
    *
    * @returns Un tableau contenant les informations sur tous les pays
    */
    getDataFromServerCountry():Observable<any[]>{
      return this.http.get<any[]>(this.baseURL2);
    }


    getCitiesAndCountries():Observable<any[]>{
      return this.http.get<any[]>(this.baseURL);

    }

    /**
     *
     * @param index l'identifiant du Ville
     * @returns Cette methode permettant de recuperer les informations sur une seule Ville
     */

    getOneVille(index:object):Observable<any>{
      return this.http.get<any>(this.baseURL+`/${index}`);
    }

    /**
     *
     * @param index l'identifiant du Ville
     * @returns Cette methode permettant de recuperer les informations sur un seul pays
     */

    getOneCountry(index:object):Observable<any>{
      return this.http.get<any>(this.baseURL2+`/${index}`);
    }

    /**
    *
    * @param data est de type Ville
    * @returns Permet de pouvoir envoyer des donnees à la base de données
    */
    sendVille(data:Ville){
      return this.http.post(this.baseURL,data,{observe:'response'});
    }

    /**
    *
    * @param data est de type Pays
    * @returns Permet de pouvoir envoyer des donnees à la base de données
    */
    sendCountry(data:Pays){
      return this.http.post(this.baseURL2,data,{observe:'response'});
    }


    /**
     *
     * @param data est une ville
     * Cette Methode permet de modifier les informations sur un Ville
     */
    updateVille(data:Ville):Observable<Ville>{
      return this.http.put<Ville>(this.baseURL + `/${data._id}`,data);
    }

    /**
     *
     * @param data est un pays
     * Cette Methode permet de modifier les informations sur un pays
     */
    updatePays(data:Pays):Observable<Pays>{
      return this.http.put<Pays>(this.baseURL2 + `/${data._id}`,data);
    }


    /**
    *
    * @param index c'est l'identifiant du Ville à supprimer
    * @returns Cette methode permet de supprimer un Ville dans la base de données
    */
    deleteVille(index:object):Observable<Ville>{
      return this.http.delete<Ville>(this.baseURL + `/${index}`);
    }

    /**
    *
    * @param index c'est l'identifiant du pays à supprimer
    * @returns Cette methode permet de supprimer un pays dans la base de données
    */
    deletePays(index:object):Observable<Pays>{
      return this.http.delete<Pays>(this.baseURL2 + `/${index}`);
    }
}
 