import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import '@cds/core/modal/register.js';
import '@cds/core/card/register.js';
import { Exercice } from 'src/app/models/exercice';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListesExerciceService } from 'src/app/services/listes-exercice.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.component.html',
  styleUrls: ['./exercice-detail.component.css']
})
export class ExerciceDetailComponent implements OnInit,OnDestroy {

  buttonClicked:boolean = false; // afficher un modal de confirmation d'action sur un exercice si un boutton d'action est afficher
  open:boolean = false; // controler l'ouverture du modal
  whichButton:number; // Quelle est le boutton cliquer
  isRedemarer:boolean=false;
  loading:boolean=true;
  exercice:Exercice = new Exercice(null,null,null,null,null);
  subGetExercice:Subscription;
 dateRestant:number;
 dateFinForm =  new FormGroup({});

 readonly  statusOk = 200;//les requette http ont reuissis
 idExercice ;
  datepipe: DatePipe;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private exerciceService:ListesExerciceService,
    private route:ActivatedRoute,

    ) {}

  ngOnInit(): void {

    //recuperation de l'exercice
      this.route.paramMap
        .subscribe(
          (params)=>{
            this.idExercice = params.get('_id');
          }
        )

    this.retreiveExercice(this.idExercice);

    this.dateFinForm = this.fb.group({
      dateFin:this.fb.control('',Validators.required)
     });
  }

  //ouverture du modal pour la suppression d'un execice

  deleteExoHandle():void{
    this.open = true;
    this.buttonClicked=true;
    this.whichButton = 0; // si c'est le button de suppression qui a été clické
   }


  /*ouverture du modal pour la modification des delais d'un exercice*/
  chronologiehandle():void{
    this.open = true;
    this.buttonClicked=true;
    this.whichButton = 1; //si c'est de modification qui est clické
  }

//ouverture du modal pour la cloture d'un execice
 finExercice():void{
  this.open = true;
  this.buttonClicked=true;
  this.whichButton = 2; //si c'est le button de terminaison qui est clické

 }

get isCloseExercice():boolean{
    if(this.exercice.etat === true) return true
    return false;
 }



  /* --------------------------------------- */

  retreiveExercice(id){
   this.subGetExercice =  this.exerciceService.getOneExercice(id).subscribe(
      (response:Exercice)=>{

          this.exercice = response;
      },
      (error)=>{

        this.loading = false;
        alert("erreur de recuperation de l'exercice:" + error)
      },

      ()=>{

        this.loading = false;
      }
    )
  }



get isprolonger():boolean{
  if(this.whichButton == 1)  return true;
  return false;
}

 get isDelete():boolean{
     if(this.whichButton == 0)  return true;
     return false;
  }

  get isTerminer():boolean{
      if(this.whichButton == 2)  return true;
      return false;
  }

//methode de suppression
deleteExercice(idExercice){
     this.exerciceService.DeleteDataFromExercice(idExercice).subscribe(
          (response:HttpResponse<Exercice>)=>{
            if(response.status===this.statusOk){
              this.open = false;
              this.gotoExercice();
            }
           },
           (error)=>{
              this.open = false;
              alert("desole un probleme est survenu lors de la suppression de l'exercice" + error);
           }
    );
}

//methode pour terminer un exercice
  endedExercice(exercice:Exercice){

      //clore l'exercice
      if(exercice.etat==false){
        exercice.etat = true;
        this.exerciceService.UpdateDataFromExercice(exercice).subscribe(
          (response:HttpResponse<Exercice>)=>{
               if(response.status===this.statusOk){

                  this.open = false;
              }
          },
          (error)=>{
              this.open = false;

              alert("desole un probleme est survenu lors de la modification de l'exercice" + error);
         }
        )
      }


  }

//modification de la chronologie d'un exercice
  updateExerciceData(exercice:Exercice){
    exercice.dateFin = new Date(); //l'exercice est nouvelle date
    this.exerciceService.UpdateDataFromExercice(exercice).subscribe(
      (response:HttpResponse<Exercice>)=>{
           if(response.status===this.statusOk){

              this.open = false;
          }
      },
      (error)=>{
          this.open = false;

          alert("desole un probleme est survenu lors de la modification de l'exercice" + error);
     }
    )
  }

// quand on click sur annuler fermer le model
  handleCandel(){
    this.open = false;

  }

  //pour fermer le widzard ==> prevenir son parent contenant les boutons
  eventCloseModal(value){
   if(value == false) {

    };
  }

  onSubmitModifier(){
    //this.dateFinForm.get('dateFin').value typeof(this.dateFinForm.get('dateFin').value)
    const dateFin =  new Date(this.dateFinForm.get('dateFin').value);

    if(this.exerciceService.checkExerciceDate(this.exercice.dateDebut,dateFin)){
        this.updateExerciceData(this.exercice)
    }else{
      alert("la date de fin est superieur à la date de debut");
    }

  }

  //quand on click sur ok effectue l'action escomptée
  handleDone(){
    //pour supprimer l'exercice
     if(this.whichButton===0 ) {
        this.deleteExercice(this.exercice._id);
    }
    //pour terminer un exercice
     if(this.whichButton == 2) {
       this.endedExercice(this.exercice);
     }

  }

  isValid(){
      if (this.dateFinForm.get("dateFin").valid)  return false
      return true
  }
    //methode de retour sur la page d'exercice
  gotoExercice():void{
    this.router.navigate(['/exercices'])
  }

  ngOnDestroy(): void {
      this.subGetExercice.unsubscribe();
  }

}
