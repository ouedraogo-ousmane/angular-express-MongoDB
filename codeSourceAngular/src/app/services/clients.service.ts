import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Particulier } from '../models/particulier';
import { Entreprise } from '../models/entreprise';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  readonly baseURL = 'http://localhost:3500/client';

  readonly baseURL1 = 'http://localhost:3500/particulier';

  readonly baseURL2 = 'http://localhost:3500/entreprise';

  constructor(private http:HttpClient) { }


  getClients():Observable<Client[]>{
    return this.http.get<Client[]>(this.baseURL);
  }

  /**
 *
 * @returns Un tableau contenant les informations sur tous les clients entreprises
 */
 getDataClientEntrepriseFromServer():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL2+"/data");

}

/**
 *
 * @returns Un tableau contenant les informations sur tous les clients particuliers
 */
 getAllDataFromParticulier():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL1+'/particulier');

}

/**
 *
 * @param index l'identifiant du client
 * @returns Cette methode permettant de recuperer les informations sur un seul client
 */

getOneClientEntreprise(index:object):Observable<any>{
  return this.http.get<any>(this.baseURL2+`/${index}`);
}

/**
 *
 * @param index l'identifiant du client
 * @returns Cette methode permettant de recuperer les informations sur un seul client particulier
 */

 getOneClientParticulier(index:object):Observable<any>{

  return this.http.get<any>(this.baseURL1+`/${index}`);

}

/**
*
* @param data est de type client
* @returns Permet de pouvoir envoyer des donnees à la base de données
*/
sendClientEntreprise(data:Entreprise){
  return this.http.post(this.baseURL2,data,{ observe: 'response' });
}

/**
*
* @param data est de type particulier
* @returns Permet de pouvoir envoyer des donnees à la base de données
*/
sendClientParticulier(data:Particulier){
  return this.http.post(this.baseURL1,data,{ observe: 'response' });

}

sendClient(client:Client):Observable<Client>{
  return this.http.post<Client>(this.baseURL,client);
}

/**
 *
 * @param data est un client
 * Cette Methode permet de modifier les informations sur un client entreprise
 */
 updateClient(data:Client):Observable<any>{

  return this.http.put<any>(this.baseURL + `/${data._id}`,data);

}

/**
 *
 * @param data est un client
 * Cette Methode permet de modifier les informations sur un client entreprise
 */
updateClientEntreprise(data:Entreprise):Observable<any>{

  return this.http.put<any>(this.baseURL2 + `/${data._id}`,data);

}

/**
 *
 * @param data est un particulier
 * Cette Methode permet de modifier les informations sur un client particulier
 */
 updateClientParticulier(data:Particulier):Observable<any>{

  return this.http.put<any>(this.baseURL1 + `/${data._id}`,data);

}

/**
*
* @param index c'est l'identifiant du client à supprimer
* @returns Cette methode permet de supprimer un client entreprise dans la base de données
*/
deleteClient(index:object):Observable<Client>{

  return this.http.delete<Client>(this.baseURL2 + `/${index}`);

}


/**
*
* @param index c'est l'identifiant du client à supprimer
* @returns Cette methode permet de supprimer un client entreprise dans la base de données
*/
deleteClientEntreprise(index:object):Observable<Entreprise>{

  return this.http.delete<Entreprise>(this.baseURL2 + `/${index}`);

}

/**
*
* @param index c'est l'identifiant du client particulier à supprimer
* @returns Cette methode permet de supprimer un particulier dans la base de données
*/
deleteClientParticulier(index:object):Observable<Particulier>{

  return this.http.delete<Particulier>(this.baseURL1 + `/${index}`);

}

}
