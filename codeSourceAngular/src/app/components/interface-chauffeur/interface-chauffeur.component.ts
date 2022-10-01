import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { airplaneIcon, ClarityIcons, noteIcon, trashIcon, userIcon } from '@cds/core/icon';

import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@cds/core/password/register.js';
import '@cds/core/icon/register.js';
import { ChauffeurService } from '../../services/chauffeur.service';
import { Chauffeur } from 'src/app/models/chauffeur';
import { administrationService } from 'src/app/services/administration.service';
@Component({
  selector: 'app-interface-chauffeur',
  templateUrl: './interface-chauffeur.component.html',
  styleUrls: ['./interface-chauffeur.component.css']
})
export class InterfaceChauffeurComponent implements OnInit {

  chauffeurForm = new FormGroup({});
  navigationTab = [];
  chauffeurListe: Chauffeur[] =[];
  openSaveDriverModal:boolean=true;

 image = new Image();
  chauffeur:Chauffeur = new Chauffeur(null,null,null,null,null,null,null,null,null,null);
  makeSelected: boolean =true;
  backup: boolean =true;
  onUpdating:boolean = false;
  imageData: string;
  open: boolean;
  openModifier:boolean = false;
  isNewDriver:boolean = false;

  constructor(
    private fb:FormBuilder,
    private httpService:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private chauffeurService:ChauffeurService,
    private adminService:administrationService
    ) { this.navigationTab.push("/exercices"); }

    ngOnInit():void {

      //clarity icons
    ClarityIcons.addIcons(userIcon,airplaneIcon,noteIcon, trashIcon);

      this.chauffeurForm= this.fb.group({
        nom:this.fb.control('',Validators.required),
        prenom:this.fb.control('',Validators.required),
        telephone: this.fb.control('',Validators.required),
        adresse: this.fb.control(''),
        _id: this.fb.control(''),
        password: this.fb.control(''),
        photo: this.fb.control(''),
        permis: this.fb.control(''),
        dateExp: this.fb.control('')

    });

    this.emitdataChauffeur();
   this.adminService.isRefreshAdminPage();
  }
  get isDriver(){
    if((this.chauffeurForm.get('nom').valid &&
    this.chauffeurForm.get('prenom').valid &&
    this.chauffeurForm.get('telephone').valid)) return true;
    return false;
  }

  //the interface work only when you are clicked on the new button
  isNewSaving():void{
    this.makeSelected = false;
    this.backup = false;
    this.onUpdating = false;
  }

  getAll():void{
    this.chauffeur._id = this.chauffeurForm.get('_id').value;
    this.chauffeur.nom = this.chauffeurForm.get('nom').value;
    this.chauffeur.prenom =this.chauffeurForm.get('prenom').value;
    this.chauffeur.photo = this.chauffeurForm.get('photo').value;
    this.chauffeur.password =this.chauffeurForm.get('password').value;
    this.chauffeur.telephone = this.chauffeurForm.get('telephone').value;
    this.chauffeur.adresse = this.chauffeurForm.get('adresse').value;
    this.chauffeur.permisExp = new Date(this.chauffeurForm.get('dateExp').value);
    this.chauffeur.permis = this.chauffeurForm.get('permis').value;
  }

  onEdit(chauffeur:Chauffeur){
    this.backup=false;
    this.onUpdating = true;
    this.chauffeurForm.get('_id').setValue(chauffeur._id);
    this.chauffeurForm.get('nom').setValue(chauffeur.nom);
    this.chauffeurForm.get('prenom').setValue(chauffeur.prenom);
    this.chauffeurForm.get('photo').setValue(chauffeur.photo);
    this.chauffeurForm.get('password').setValue(chauffeur.password);
    this.chauffeurForm.get('telephone').setValue(chauffeur.telephone);
    this.chauffeurForm.get('adresse').setValue(chauffeur.adresse);
    this.chauffeurForm.get('dateExp').setValue(chauffeur.permisExp);
    this.chauffeurForm.get('permis').setValue(chauffeur.permis);
    this.openModifier =true;
   // console.log(this.account);

  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.chauffeurForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(){
    this.backup = true;
    this.makeSelected = true;
    this.chauffeurForm.reset();
  }
  //the interface is disabled when you clicked on the save button
  isSave(){
    this.backup = true;
    this.makeSelected = true;

    this.getAll();

    if(this.onUpdating != true){
      this.chauffeurForm.reset();
      this.openModifier = false;
      this.chauffeurService.sendChauffeur(this.chauffeur).subscribe(
        (resp)=>{
          this.emitdataChauffeur();
          this.onCancel();

        }
        ); 
    }else{
      this.chauffeurService.updateChauffeur(this.chauffeur).subscribe(
        (resp)=>{
          this.emitdataChauffeur();
          this.chauffeurForm.reset();
          this.onCancel();
        }
        );;
    }

    this.imageData = null;
  }

  openAddDriver(){
    this.isNewDriver = true;
  }

  /**
   * Methode de recuperations des données
   */


  emitdataChauffeur():void{

    this.chauffeurService.getDataFromServer().subscribe(
      (dataRecup:any)=>{
        this.chauffeurListe=dataRecup;
      }
    );

  }


  /**
   *
   * @param data est une donnée de type chauffeur
   */

  onDelete(data:Chauffeur):void{
    this.chauffeur = data;
    this.open = true;
  }


  handleDone(i:boolean){
    if(i===true){
      this.chauffeurService.deleteChauffeur(this.chauffeur).subscribe(
        (resp)=>{
          this.emitdataChauffeur();
        }
        );
    };

      this.open = false;
   }
   isSpot:boolean = false;
   isSpotAction   = true;
   hiddenSpot(){
    setTimeout(()=>{
      this.isSpot = true;
      this.isSpotAction= false;
     },10)

   }

   displaySpot(){
     setTimeout(()=>{
      this.isSpot = false;
      this.isSpotAction= true;
     },10)


   }

   goToDriver(){
    this.router.navigate(['chauffeur',true])
}

   /****-------------- ****/
   closeModal(){
    this.isNewDriver = false;
    this.chauffeurForm.reset();
   }

}



