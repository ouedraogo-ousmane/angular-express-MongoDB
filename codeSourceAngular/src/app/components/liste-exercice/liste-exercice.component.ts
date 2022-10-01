import { Component, OnDestroy, OnInit } from '@angular/core';
import { airplaneIcon, ClarityIcons, cogIcon, flaskIcon, userIcon } from '@cds/core/icon';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Exercice } from 'src/app/models/exercice';
import {Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Responsable } from 'src/app/models/responsable';
import { ListesExerciceService } from '../../services/listes-exercice.service';
import { HttpResponse } from '@angular/common/http';

import '@cds/core/forms/register.js';

import '@cds/core/button/register.js';
import '@cds/core/icon/register.js';
import '@cds/core/modal/register.js';
@Component({
  selector: 'app-liste-exercice',
  templateUrl: './liste-exercice.component.html',
  styleUrls: ['./liste-exercice.component.css']
})
export class ListeExerciceComponent implements OnInit,OnDestroy {

    //variables

  listExercice:Exercice[] = [];
  subGetExercice:Subscription;
  exerciceForm:FormGroup;
  isAddExerciceButtonClic= false;
  responsable : Responsable;
  exo : Exercice = new Exercice(null,null,null,null,null);
  handleExercice:boolean =  true;

  ismenuWanted:boolean = true;

  navigationTab = [];

  loadingState:boolean = true;
  //variable de detail sur les exercices
  isExerciceClicked = false;

  progressBar:number = 30;

  exerciceDetail:boolean = true;
  private id;

  loading:boolean=true;

  responsables : Responsable[];

  constructor(
    private fb:FormBuilder,
    private exerciceService : ListesExerciceService,
    private router:Router,
    private route:ActivatedRoute) {
    this.navigationTab.push("/exercices");
    }

  ngOnInit(): void {
      //icons clarity
    ClarityIcons.addIcons(userIcon,cogIcon,airplaneIcon,flaskIcon);
    this.getExercices(); //recuperation des exercices
    this.ismenuWanted = false;
    this.exerciceForm = this.fb.group(
      {
        exerciceInfo: this.fb.group({
        dateDebut:this.fb.control('',Validators.required),
        dateFin:this.fb.control('',Validators.required),
        etat: true,
        auteur: this.fb.control(sessionStorage.roles,Validators.required)

      }
     )
    });
  }

    loadindStart(loadingState){
      this.loadingState =  loadingState;
    }

//@CeerExercice(): affichage du module de creation de l'exercice
    CeerExercice():void{
      this.isAddExerciceButtonClic = true;

    }


//@getExercices(): recuperation des exercices creer
      getExercices():void{
      this.subGetExercice =  this.exerciceService.getAllExericeFromServer().subscribe(
          (value:Exercice[])=>{
            this.progressBar = 50;
            this.listExercice = value;
          },

          (error)=>{
              this.loadingBar();
              alert("un probléme est survenu lors de la recuperation des exercice:"+ error);
          },

          ()=>{
            this.loadingBar()
          }
          );
    }

//loading bar
    loadingBar(){
        this.progressBar = 80;
        setTimeout(()=>{
          this.progressBar = 100;
          this.loading=false;
        },1000)
    }

// isExercice(): verifie si il y a des exercices créer
    get isExercice():boolean{
      if(this.listExercice.length === 0) return true;

      return false;
    }

// fermeture du  modal
  eventCloseModal(value):void{
          this.isAddExerciceButtonClic = value;
      }


    eventEmitCreateExo(exercie){
      this.listExercice.push(exercie);
    }

//methode d'ouverture des details sur un exercice clicked
    retreiveExoDetail(exochosed):void{
        this.isExerciceClicked = true;
        this.navigationTab.push('/exercicedetail')
        this.exerciceDetail = exochosed;
    }

    gotoAdmin():void{
      this.isExerciceClicked = true;
      this.ismenuWanted = false;
      this.router.navigate(['adminPage'],{relativeTo:this.route});
    }

    gotoExo(){
      this.ismenuWanted = false;
      this.isExerciceClicked = false;
      this.progressBar = 30;
      this.loading = true;
      this.getExercices()
      this.router.navigate(['exercices']);
    }

    gotoExercice(exercice){
      this.isExerciceClicked = true;
      this.router.navigate(['exercicedetail',exercice._id], {relativeTo:this.route});
      this.ismenuWanted = true;
    }

    /*----------------------------------------*/
//@AddExercice(): Ajouter un nouvelle exercice new Date(this.exerciceForm.get('exerciceInfo').get('dateDebut').value)
    AddExercice(){

      //formatage de la Date(year,month,year):
      let jour = this.exerciceForm.get('exerciceInfo').get('dateFin').value.split('/')[0];
      let mois = this.exerciceForm.get('exerciceInfo').get('dateFin').value.split('/')[1];
      let year = this.exerciceForm.get('exerciceInfo').get('dateFin').value.split('/')[2];
      this.exo.dateFin = new Date(year,mois-1,jour);

          jour = this.exerciceForm.get('exerciceInfo').get('dateDebut').value.split('/')[0];
          mois = this.exerciceForm.get('exerciceInfo').get('dateDebut').value.split('/')[1];
          year = this.exerciceForm.get('exerciceInfo').get('dateDebut').value.split('/')[2];
      this.exo.dateDebut = new Date(year,mois-1,jour);

      this.exo.etat = false;

      this.exo.responsable = new Object('61dc399a1a704c623a6a9c47');

              //  envoie de l'exercice si les dates sont correctes

        if(this.exerciceService.checkExerciceDate(this.exo.dateDebut,this.exo.dateFin)){
            this.exerciceService.SendDataToExercice(this.exo).subscribe(
                (response:HttpResponse<Exercice>)=>{
                      this.getExercices()
                  },
                    (error)=>{
                        alert("une error c'est produit lors de l'enregistrement de l'exercice:"+error)
                    }
                  );
              }
              else{
                alert("error la de debut est superieur à la date de fin");
              }
              //fermeture du modal de ceation
              this.CloseModal()
    }
    //@isValid(): desactive le button tant pas correcte
    isValid():boolean{

      if(this.exerciceForm.get('exerciceInfo')?.invalid){
        return true;
      }
      return false;
    }

    CloseModal(){
      this.isAddExerciceButtonClic = false;
    }

    ngOnDestroy(): void {
      this.subGetExercice.unsubscribe();
    }

}
