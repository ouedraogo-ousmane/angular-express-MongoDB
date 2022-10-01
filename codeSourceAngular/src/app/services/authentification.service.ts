import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { LogInfo } from '../models/userLogin.model';
import { Operations } from '../models/operations.model';


@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  readonly baseURL = 'http://localhost:3500/roles';
  readonly baseURLlog = 'http://localhost:3500/account/login';
  auth_token: string;


  constructor(private http: HttpClient) { }

    //methode de recuperation des données d'authentification
 /* getUserDataFromServer():Observable<Account[]>{

    //return this.http.get<Account[]>(this.baseURL);
  }*/
  authenticate(user:LogInfo): Observable<any> {

      return this.http.post<any>(this.baseURLlog, user);
       
  };  

  getLoginRoles(id:object):Observable<any>{

    return this.http.get<any>(this.baseURL+`/${id}`);

  }

  /**
   * Methode de verification d'une authentification
   */
  get authenticated(): boolean {
    

    return this.auth_token != null;

  }
  /**
   * Methode qui permet d'envoyer le role dans la variable de session
   */
 

  public setRoles(roles:object){

    sessionStorage.setItem('roles',JSON.stringify(roles));

  }

  //Cette methode permet de recuperer le role dans la varible de session

  public getRoles(){

    return JSON.parse(sessionStorage.getItem('roles'));

  }

  // Cette methode permet d'envoyer le token d'une connexion dans la variable de session
  public setToken(jwtToken:string){

    sessionStorage.setItem('jwtToken',jwtToken);
  }

  //Cette methode permet de recuperer le tocken d'une connexion en cours dans la variable de session
  public getToken():string{

    return sessionStorage.getItem('jwtToken');

  }

  public setRolesOperations(operations:Operations[]){

    sessionStorage.setItem('operations',JSON.stringify(operations));

  }

  public getRolesOperations():Operations[]{

    return JSON.parse(sessionStorage.getItem('operations'));

  }

  // Cette methode permet d'effacer le contenu d'une session aprés une deconnexion

  public clear(){

    sessionStorage.clear();

  }

//Cette methode permet de verifier si un user est authentifié

  public isLogged(){

    return this.getRoles() && this.getToken();

  }

}