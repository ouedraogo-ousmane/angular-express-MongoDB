import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Exercice } from '../models/exercice';
import { ListesExerciceService } from '../services/listes-exercice.service';

@Component({
  selector: 'app-modal-action-exo',
  templateUrl: './modal-action-exo.component.html',
  styleUrls: ['./modal-action-exo.component.css']

})

export class ModalActionExoComponent implements OnInit {

  //variables
  @Input() whichButton; //

  @Input() open; //

  @Output() suppEvent = new EventEmitter(); //

  @Input() exercice:Exercice;

  constructor(
    private exerciceService:ListesExerciceService,
    private route:Router
    ) {

   }

  ngOnInit(): void {

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
  deleteExercice(idExercice):boolean{

    let exoSupp = null;
     this.exerciceService.DeleteDataFromExercice(idExercice).subscribe(
          (exerciceDel)=>{ exoSupp = exerciceDel;}
    );

   if(exoSupp!=null) return true;
   return false;

  }

//methode pour terminer un exercice
  endedExercice(stateExercice){

  }

//modification de la chronologie d'un exercice
  updateExerciceData(idExercice){ }

// quand on click sur annuler fermer le model
  handleCandel(){
    this.open = false;
    this.suppEvent.emit("cancel");
  }

  //pour fermer le widzard ==> prevenir son parent contenant les boutons
  eventCloseModal(value){
   if(value == false) {
    this.suppEvent.emit(value)
    };
  }

  //quand on click sur ok effectue l'action escomptée
  handleDone(){

    //pour supprimer l'exercice
    if(this.whichButton == 0 ) {
        if(this.deleteExercice(this.exercice._id)){
          this.open = false;
          this.suppEvent.emit("cancel");
          this.gotoExercice();
        }
        else{
          this.open = false;
          this.suppEvent.emit("cancel");
          alert("desole un probleme est survenu lors de la suppression de l'exercice");
        }

     }

    //pour terminer un exercice
     if(this.whichButton == 2) {
      this.suppEvent.emit("cancel");
      this.open = false;

      this.endedExercice(this.exercice._id);

     }

  }

    //methode de retour sur la page d'exercice
  gotoExercice():void{
    this.route.navigate(['/exercices'])
  }

}
