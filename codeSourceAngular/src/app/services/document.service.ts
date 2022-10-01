import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentVehicule } from '../models/document-vehicule';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  readonly baseURL = 'http://localhost:3500/document';

  constructor(private http:HttpClient) { }

     /**
   * 
   * @returns Un tableau contenant les informations sur tous les documents d'un vehicule
   */
      getDataFromServer():Observable<any[]>{

        return this.http.get<any[]>(this.baseURL);
        
      }
    
      /**
       * 
       * @param index l'identifiant du document
       * @returns Cette methode permettant de recuperer les informations sur un seul document
       */
    
      getOneDocumentVehicule(index:object):Observable<any>{
    
        return this.http.get<any>(this.baseURL+`/${index}`);
    
      }
    
      /**
      * 
      * @param data est de type document
      * @returns Permet de pouvoir envoyer des donnees à la base de données
      */
      sendDocumentVehicule(data:DocumentVehicule):Observable<any>{
    
        return this.http.post<any>(this.baseURL,data);
    
      }
    
    
      /**
       * 
       * @param data est un document
       * Cette Methode permet de modifier les informations sur un DocumentVehicule
       */
      updateDocumentVehicule(data:DocumentVehicule):Observable<any>{
    
        return this.http.put<any>(this.baseURL + `/${data._id}`,data);
    
      }
    
      /**
      * 
      * @param index c'est l'identifiant du document à supprimer
      * @returns Cette methode permet de supprimer un document dans la base de données
      */
      deleteDocumentVehicule(index:object):Observable<DocumentVehicule>{
    
        return this.http.delete<DocumentVehicule>(this.baseURL + `/${index}`);
    
      }
}
