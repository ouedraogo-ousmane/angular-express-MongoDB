import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../models/produit';
import { Observable } from 'rxjs';
import { InfosCoutRecette } from '../models/infos-cout-recette';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  readonly baseURL = 'http://localhost:3500/produit';
  readonly baseURL1 = 'http://localhost:3500/infosRecette';
  readonly baseURL2 = 'http://localhost:3500/infosRecette/produitData';


  constructor(private http:HttpClient) { }

    /**
   * 
   * @returns Un tableau contenant les informations sur tous les produits
   */
  getDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  /**
   * Receuperation de toutes les informations issue de la jointure produit et infosRecette
   */

  getDataTable():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL2);
    
  }


  /**
   * 
   * @param index l'identifiant du produit
   * @returns Cette methode permettant de recuperer les informations sur un seul produit
   */

  getOneProduit(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

  /**
  * 
  * @param data est de type produit
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
  sendProduit(data:Produit):Observable<any>{

    return this.http.post<any>(this.baseURL,data);

  }

  /**
  * 
  * @param data est de type infosCoutRecette
  * @returns Permet de pouvoir envoyer des donnees à la base de données
  */
   sendInfosProduit(data:InfosCoutRecette):Observable<any>{

    return this.http.post<any>(this.baseURL1,data);

  }


  /**
   * 
   * @param data est un produit
   * Cette Methode permet de modifier les informations sur un produit
   */
  updateProduit(data:Produit):Observable<any>{

    return this.http.put<any>(this.baseURL + `/${data._id}`,data);

  }

   /**
   * 
   * @param data est un InfosCoutRecette
   * Cette Methode permet de modifier les informations sur un InfosCoutRecette
   */
    updateInfosProduit(data:InfosCoutRecette):Observable<any>{

      return this.http.put<any>(this.baseURL1 + `/${data._id}`,data);
  
    }
  

  /**
  * 
  * @param index c'est l'identifiant du produit à supprimer
  * @returns Cette methode permet de supprimer un produit dans la base de données
  */
  deleteProduit(index:object):Observable<Produit>{

    return this.http.delete<Produit>(this.baseURL + `/${index}`);

  }

  
  /**
  * 
  * @param index c'est l'identifiant du produit à supprimer
  * @returns Cette methode permet de supprimer un produit dans la base de données
  */
   deleteInfosProduit(index:object):Observable<InfosCoutRecette>{

    return this.http.delete<InfosCoutRecette>(this.baseURL1 + `/${index}`);

  }

  
}
