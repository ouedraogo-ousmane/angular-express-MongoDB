import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chauffeur } from '../models/chauffeur';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  readonly baseURL = 'http://localhost:3500/chauffeur';

  readonly baseURL1 = 'http://localhost:3500/image';

  constructor(private http:HttpClient) { }

   /**
 * 
 * @returns Un tableau contenant les informations sur tous les chauffeurs
 */
 getDataFromServer():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL);
  
} 

sendImage(image:any):Observable<any>{
  return this.http.post<any>(this.baseURL1,image);
}

/**
 * 
 * @param index l'identifiant du chauffeur
 * @returns Cette methode permettant de recuperer les informations sur un seul chauffeur
 */

getOneChauffeur(index:object):Observable<any>{

  return this.http.get<any>(this.baseURL+`/${index}`);

}

/**
* 
* @param chauffeur est de type chauffeur
* @returns Permet de pouvoir envoyer des donnees à la base de données
*/
sendChauffeur(chauffeur:Chauffeur):Observable<any>{
  /*nom:string,prenom:string,permis:string,permisExp:string,image:File
  const chauffeurData = new FormData();
  chauffeurData.append("nom",nom);
  chauffeurData.append("prenom",prenom);
  chauffeurData.append("permis",permis);
  chauffeurData.append("permisExp",permisExp);
  chauffeurData.append("image",image);*/
  return this.http.post<any>(this.baseURL,chauffeur);

}


/**
 * 
 * @param data est un Chauffeur
 * Cette Methode permet de modifier les informations sur un Chauffeur
 */
updateChauffeur(data:Chauffeur):Observable<Chauffeur>{

  return this.http.put<Chauffeur>(this.baseURL + `/${data._id}`,data);

}

/**
* 
* @param index c'est l'identifiant du Chauffeur à supprimer
* @returns Cette methode permet de supprimer un Chauffeur dans la base de données
*/
deleteChauffeur(index:Chauffeur):Observable<Chauffeur>{

  return this.http.delete<Chauffeur>(this.baseURL + `/${index._id}`);

}


}
