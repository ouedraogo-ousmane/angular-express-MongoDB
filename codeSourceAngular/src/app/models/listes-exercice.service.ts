import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { Exercice } from '../models/exercice';


@Injectable({
  providedIn: 'root'
})

export class ListesExerciceService {

  //url de la table exercice
  readonly baseUrl = 'http://localhost:3500/exercices';

  constructor(
    private http : HttpClient
  ) {}


  //methode pour verifier un exercice est à terme
  isCloseExercice(exercice:Exercice):boolean{
      if(new Date() === exercice.dateFin) return true;
      else return false;
  }

  //methode pour verifier les date de validité d'un exercice

  checkExerciceDate(dateDebut:Date, dateFin:Date):boolean{
      if(dateDebut>dateFin) return false;
      else return true;
  }

   // Methode permettant d'emettre les données de l'obersable
   emitdata(){ }

   //Methode de recuperation de toutes les exercices

   getAllExericeFromServer():Observable<Exercice[]>{
      return this.http.get<Exercice[]>(this.baseUrl);
    }


    // Methode de Recuperation d'un exercice dans la liste des exercice

    getOneExercice(index: object):Observable<Exercice>{
      return this.http.get<Exercice>(this.baseUrl+`/${index}`);
    }

    //Methode d'envoies des données dans la table Exercie
    SendDataToExercice(data: Exercice){
      // clore l'exercice si neccessaire
      if(this.isCloseExercice(data)){
        data.etat = true;
     }
      return  this.http.post(this.baseUrl,data,{ observe: 'response' });
    }

    //Methode de modifications des données dans la table exercice
    UpdateDataFromExercice(data:Exercice){
      // clore l'exercice si neccessaire
      if(this.isCloseExercice(data)){
        data.etat = true;
     }
      return this.http.put(this.baseUrl+'/'+data._id, data,{ observe: 'response' } )
    }

    //Methode de suppression d'une données dans Exercice
    DeleteDataFromExercice(_id:object){
      return this.http.delete(this.baseUrl+`/${_id}`,{ observe: 'response' } );
    }

}
