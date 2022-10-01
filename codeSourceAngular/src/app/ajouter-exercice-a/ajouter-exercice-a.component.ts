import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercice } from '../models/exercice';
import { ListesExerciceService } from '../services/listes-exercice.service';

@Component({
  selector: 'app-ajouter-exercice-a',
  templateUrl: './ajouter-exercice-a.component.html',
  styleUrls: ['./ajouter-exercice-a.component.css']
})

export class AjouterExerciceAComponent implements OnInit {

  //variables
  subGetExercice:Subscription;
  exerciceForm:FormGroup;
  AddExo = true;
  exo : Exercice = new Exercice(null,null,null,null,null);

  dtrans:DatePipe;

  @Output() eventCloseModal = new EventEmitter();
  @Input() exercice:Exercice;


constructor(private fb:FormBuilder,
            private httpService:HttpClient,
            private router:Router,
            private exerciceService : ListesExerciceService,
            private datepipe: DatePipe)  { }


   ngOnInit(): void {

    
    
      
    this.exerciceForm = this.fb.group(
        {
          exerciceInfo: this.fb.group({
          dateDebut:this.fb.control('',Validators.required),
          dateFin:this.fb.control('',Validators.required),
          etat: false,
          auteur: this.fb.control(sessionStorage.roles,Validators.required)
        }
       )
    });

  }


//@Close(): annulation de creation d'un exrcice
Close(){
  this.eventCloseModal.emit(false); //annuler la creation de l'exercice : fermeture du modal
}


//@AddExercice(): Ajouter un nouvelle exercice new Date(this.exerciceForm.get('exerciceInfo').get('dateDebut').value)
AddExercice(){

  this.AddExo= false;
  this.eventCloseModal.emit(false);


  //formatage de la Date() dans le ts file
  //alert(this.datepipe.transform(this.ex._date_debut,'EEEE d MMMM y'));


  this.exo.dateDebut = new Date(this.exerciceForm.get('exerciceInfo').get('dateDebut').value);

  this.exo.dateFin = new Date(this.exerciceForm.get('exerciceInfo').get('dateFin').value);

  this.exo.etat = false;

  this.exo.responsable = new Object('61dc399a1a704c623a6a9c47');

  this.exerciceService.SendDataToExercice(this.exo);

}

//@isValid(): desactive le button tant pas correcte
  isValid():boolean{

    if(this.exerciceForm.get('exerciceInfo')?.invalid){
      return true;
    }
    return false;
  }

  /**
   * Methode de prolongement d'exercice
   */
   endedExercice(){
     this.exercice.etat=false;
     this.exerciceService.UpdateDataFromExercice(this.exercice).subscribe(
       ()=>{console.log("données modifiées avec succès");
       },
       (error)=>{console.log("Erreur du type "+error);
       }
       );
   }

}
