import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecettePesage } from '../models/recette-pesage';
import { RecetteTransport } from '../models/recette-transport';

@Injectable({
  providedIn: 'root'
})
export class RecetteTransportService {

  readonly baseURL = 'http://localhost:3500/recetteTransport';
  /*readonly baseURL1 = 'http://localhost:3500/infosRecette';
  readonly baseURL2 = 'http://localhost:3500/infosRecette/produitData';*/

  constructor(private http:HttpClient) { }
   /**
   * 
   * @returns Un tableau contenant les informations sur toutes les recettes
   */
    getDataFromServer():Observable<any[]>{

      return this.http.get<any[]>(this.baseURL);
      
    }
  
    /**
     * Receuperation de toutes les informations issue de la jointure produit et infosRecette
     
  
    getDataTable():Observable<any[]>{
  
      return this.http.get<any[]>(this.baseURL2);
      
    }
  */
  
    /**
     * 
     * @param index l'identifiant d'un recette de transport
     * @returns Cette methode permettant de recuperer les informations sur un seul recette
     */
  
    getOneRecette(index:object):Observable<any>{
  
      return this.http.get<any>(this.baseURL+`/${index}`);
  
    }
  
    /**
    * 
    * @param data est de type recetteTransport
    * @returns Permet de pouvoir envoyer des donnees à la base de données
    */
    sendRecette(data:RecetteTransport):Observable<any>{
  
      return this.http.post<any>(this.baseURL,data);
  
    }
  
    
    /**
     * 
     * @param data est un produit
     * Cette Methode permet de modifier les informations sur un produit
     */
    updateRecette(data:RecetteTransport):Observable<any>{
  
      return this.http.put<any>(this.baseURL + `/${data._id}`,data);
  
    }
  
    
  
    /**
    * 
    * @param index c'est l'identifiant du produit à supprimer
    * @returns Cette methode permet de supprimer un produit dans la base de données
    */
    deleteRecette(index:object):Observable<RecetteTransport>{
  
      return this.http.delete<RecetteTransport>(this.baseURL + `/${index}`);
  
    }
  
   
  
}
