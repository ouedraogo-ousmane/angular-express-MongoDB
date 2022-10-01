import { Injectable } from '@angular/core';
import { Roles } from '../models/roles';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Privileges } from '../models/privileges';

 @Injectable({
  providedIn: 'root'
})
export class RolesService {

  readonly baseURL ='http://localhost:3500/roles';
  readonly baseURL1 ='http://localhost:3500/privileges';

  constructor(private http:HttpClient) { }

   
/**
 * 
 * @returns Un tableau contenant les informations sur tous les responsables
 */
 getRolesDataFromServer():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL);
  
}

/**
 * 
 * @param index l'identifiant du responsable
 * @returns Cette methode permettant de recuperer les informations sur un seul responsable
 */

getOneRoles(index:object):Observable<any>{

  return this.http.get<any>(this.baseURL+`/${index}`);

}


/**
* 
* @param data est de type Account ou responsable
* @returns Permet de pouvoir envoyer des donnees à la base de données
*/
sendRoles(data:Roles):Observable<Roles>{

  return this.http.post<Roles>(this.baseURL,data);

}


/**
 * 
 * @param data est un account
 * Cette Methode permet de modifier les informations sur un responsable
 */
updateRoles(data:Roles):Observable<Roles>{

  return this.http.put<Roles>(this.baseURL + `/${data._id}`,data);

}

/**
* 
* @param index c'est l'identifiant du responsable à supprimer
* @returns Cette methode permet de supprimer un responsable dans la base de données
*/
deleteRoles(index:object):Observable<Roles>{

  return this.http.delete<Roles>(this.baseURL + `/${index}`);

}

/**
 * 
 * @returns un tableau de données contenants toutes les privileges
 */

getAllprivileges():Observable<any[]>{

  return this.http.get<any[]>(this.baseURL1);

}

/**
 * 
 * @param privilege 
 * @returns Methode de modification des privileges
 */

updateprivilege(privilege:Privileges):Observable<any>{

  return this.http.put<any>(this.baseURL1+`/${privilege._id}`,privilege)
}



}
