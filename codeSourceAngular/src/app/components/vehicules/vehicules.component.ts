import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicules } from '../../models/vehicules';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';

import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@cds/core/password/register.js';
import '@cds/core/icon/register.js';
import '@cds/core/modal/register.js';
import { VehiculesService } from 'src/app/services/vehicules.service';
import { DocumentVehicule } from '../../models/document-vehicule';
@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  carSaveForm: FormGroup =new FormGroup({});
  makeSelected: boolean =true;
  backup: boolean =true;
  onUpdating:boolean = false;
  imageData: string;
  navigationTab = [];
  today=new Date();
  vehicule:Vehicules = new Vehicules(null,"",0,"","",true,0,"",this.today);

  document1:DocumentVehicule = new DocumentVehicule(null,null,null,null,null);
  document2:DocumentVehicule = new DocumentVehicule(null,null,null,null,null);



  vehiculeListe:Vehicules[]=[];
  open: boolean = false;


  /*vehiculeListe:Vehicules[]=[
    {
      immatriculation:"gghdhh42",
      poids:412503,
      capacite:4,
      image:"",
      model:"DAF",
      disponibilite:true,
      fonction:"Livraison",
      _id:null
    },
    {
      immatriculation:"gghdhh42",
      poids:412503,
      capacite:4,
      image:"",
      model:"DAF",
      disponibilite:true,
      fonction:"Livraison",
      _id:null
    },
    {
      immatriculation:"gghdhh42",
      poids:412503,
      capacite:4,
      image:"",
      model:"DAF",
      disponibilite:true,
      fonction:"Livraison",
      _id:null
    },
    {
      immatriculation:"gghdhh42",
      poids:412503,
      capacite:4,
      image:"",
      model:"DAF",
      disponibilite:true,
      fonction:"Livraison",
      _id:null
    },
    {
      immatriculation:"gghdhh42",
      poids:412503,
      capacite:4,
      image:"",
      model:"DAF",
      disponibilite:true,
      fonction:"Livraison",
      _id:null
    }

  ]*/

  constructor(
    private fb:FormBuilder,
    private vehiculeService:VehiculesService) {
      this.navigationTab.push("/exercices");
     }

  ngOnInit(): void {

    //clarity icons
    ClarityIcons.addIcons(userIcon,airplaneIcon);

    this.carSaveForm = this.fb.group({
      _id:this.fb.control('',Validators.required),
      immatriculation:this.fb.control('',Validators.required),
      poids:this.fb.control('',Validators.required),
      capacite:this.fb.control('',Validators.required),
      fonction:this.fb.control('',Validators.required),
      dateCirculation:this.fb.control('',Validators.required),
      AssDateDebut:this.fb.control('',Validators.required),
      AssDateExpiration:this.fb.control('',Validators.required),
      vTechDateDebut:this.fb.control('',Validators.required),
      vTechDateFin:this.fb.control('',Validators.required),
      photo:this.fb.control('',Validators.required),
      disponibilite:this.fb.control('',Validators.required)

    });
    this.emitdataVehicule();


  }


  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.carSaveForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  getAll():void{
    this.vehicule._id = this.carSaveForm.get('_id').value;
    this.vehicule.immatriculation = this.carSaveForm.get('immatriculation').value;
    this.vehicule.capacite =this.carSaveForm.get('capacite').value;
    this.vehicule.poids = this.carSaveForm.get('poids').value;
    //this.vehicule.image =this.carSaveForm.get('photo').value;
    this.vehicule.fonction = this.carSaveForm.get('fonction').value;
    this.document1.dateDebut = new Date(this.carSaveForm.get('AssDateDebut').value);
    this.document1.dateExpiration = new Date(this.carSaveForm.get('AssDateExpiration').value);
    this.document1.libelle= "assurance";
    this.document2.dateDebut = new Date(this.carSaveForm.get('vTechDateDebut').value);
    this.document2.dateExpiration = new Date(this.carSaveForm.get('vTechDateFin').value);
    this.vehicule.miseCirculation = new Date(this.carSaveForm.get('dateCirculation').value);
    this.document2.libelle="visite technique";
  }

  onEdit(vehicule:Vehicules){
    this.onUpdating = true;
    this.backup=false;


    this.carSaveForm.get('_id').setValue(vehicule._id);
    this.carSaveForm.get('immatriculation').setValue(vehicule.immatriculation);
    this.carSaveForm.get('capacite').setValue(vehicule.capacite);

    //this.carSaveForm.get('photo').setValue(vehicule.image);

    this.carSaveForm.get('poids').setValue(vehicule.poids);
    this.carSaveForm.get('fonction').setValue(vehicule.fonction);
    this.carSaveForm.get('AssDateDebut').setValue(this.document1.dateDebut);
    this.carSaveForm.get('AssDateExpiration').setValue(this.document1.dateExpiration);
    this.carSaveForm.get('vTechDateDebut').setValue(this.document2.dateDebut);
    this.carSaveForm.get('vTechDateFin').setValue(this.document2.dateExpiration);
    this.carSaveForm.get('dateCirculation').setValue(vehicule.miseCirculation);

   // console.log(this.account);

  }

  onCancel(){
    this.backup = true;
    this.makeSelected = true;
    this.carSaveForm.reset();
  }

  //the interface is disabled when you clicked on the save button
  isSave(){

    this.backup = true;
    this.makeSelected = false;

    this.getAll();

    if(this.onUpdating===true){

     this.vehiculeService.updateCar(this.vehicule).subscribe(
        (resp)=>{

          console.log(resp)
          this.onUpdating = false;
          this.emitdataVehicule();
        },
        (error)=>{
          alert("une erreur c'est produite lors de l'envoie des données")
          this.emitdataVehicule();
        }
        );
    }
    else{
      this.vehiculeService.sendCar(this.vehicule).subscribe(
        (resp)=>{
          this.emitdataVehicule();
        },
        (error)=>{
          alert("une erreur c'est produite lors de l'envoie des données")
          this.emitdataVehicule();
        }
        );

    }


  }

  /**
   * Methode de recuperations des données
   */

   isNewSaving(){
    this.makeSelected = false;
    this.backup = false;
   }
   emitdataVehicule():void{

    this.vehiculeService.getDataFromServer().subscribe(
      (dataRecup:any)=>{
        this.vehiculeListe=dataRecup;
      }
    );

  }


  /**
   *
   * @param data est une donnée de type chauffeur
   */

  updateChauffeur():void{
    this.getAll();
    this.vehiculeService.updateCar(this.vehicule).subscribe(
      ()=>{
        console.log("données modifiées avec succès")
      }
      );;
  }

  /**
   *
   * @param data est une donnée de type chauffeur
   */

  onDelete(data:Vehicules):void{
    this.vehicule = data;
    this.open = true;
  }

  handleDone(i:boolean){

   if(i===true){
    this.vehiculeService.deleteCar(this.vehicule).subscribe(
      (resp)=>{
        this.emitdataVehicule();
      },
      (error)=>{
        alert("une erreur c'est produite lors de l'envoie des données")
        this.emitdataVehicule();
      }
      );
   };

     this.open = false;
  }


}
