import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Responsable } from '../models/responsable';
import { Exercice } from '../models/exercice';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  readonly baseURL = 'http://localhost:3500/account';
  responsable! : Responsable[];
  resp!:Responsable;


  constructor(private http: HttpClient) { 
 
    
  }
  
/**
 * 
 * @returns Un tableau contenant les informations sur tous les responsables
 */
  getUserDataFromServer():Observable<any[]>{

    return this.http.get<any[]>(this.baseURL);
    
  }

  /**
   * 
   * @param index l'identifiant du responsable
   * @returns Cette methode permettant de recuperer les informations sur un seul responsable
   */

 getOneResponsable(index:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${index}`);

  }

/**
 * 
 * @param data est de type Account ou responsable
 * @returns Permet de pouvoir envoyer des donnees à la base de données
 */
  sendResponsable(data:Account):Observable<Account>{

    return this.http.post<Account>(this.baseURL,data);

  }


  /**
   * 
   * @param data est un account
   * Cette Methode permet de modifier les informations sur un responsable
   */
  updateResponsable(data:Account):Observable<Account>{

    return this.http.put<Account>(this.baseURL+`/${data._id}`,data);

  }

/**
 * 
 * @param index c'est l'identifiant du responsable à supprimer
 * @returns Cette methode permet de supprimer un responsable dans la base de données
 */
  deleteResponsable(data:Account):Observable<Account>{

    return this.http.delete<Account>(this.baseURL+`/${data._id}`);

  }

}
 
