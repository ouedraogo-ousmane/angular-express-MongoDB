import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsableService } from '../../services/responsable.service';
import { Subscription } from 'rxjs';
import { RolesService } from '../../services/roles.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Account } from 'src/app/models/Account';

declare let M : any;
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit,OnDestroy {

  responsable:any[]=[
    {name:'kalmogo',lastName:'lucien', dateCreation:'05/04/2022',role:'Gestionnaire de parc'},
    {name:'Ouedraogo',lastName:'ousmane', dateCreation:'05/04/2022',role:'Gestionnaire de la logistique'},
    {name:'kouadio',lastName:'Armel', dateCreation:'05/04/2022',role:'Administrateur'}
  ]

  accountSelected:Account = {
    nom:"",
    prenom:"",
    email:"",
    password:"",
    role:null,
    telephone:""

  };
  responsables : any[];
  account : Account = {
    nom:"",
    prenom:"",
    email:"",
    password:"",
    role:null,
    telephone:""

  };

  respSub:Subscription;
 
  @Input() gotoAdmin;

  isaddManager:boolean = false;

  onUpdating:boolean = false;

  responsableForm = new FormGroup({});

  constructor(private fb:FormBuilder,private router:Router,private responsableService:ResponsableService,private roleService:RolesService) {  

    
  }
 

  ngOnInit(): void {

    this.responsableForm= this.fb.group({
      responsableInfos : this.fb.group({
      _id:this.fb.control(''),
      nom:this.fb.control('',Validators.required),
      prenom:this.fb.control('',Validators.required),
      email: this.fb.control('',Validators.required),
      telephone: this.fb.control('',Validators.required),
      password: this.fb.control('',Validators.required),
      role: this.fb.control('',Validators.required)
    })
    
    }
   );
   
        
     this.resetForm();


    
      this.emitdataResponsable();
    

  }

  emitdataResponsable(){

    this.respSub = this.responsableService.getUserDataFromServer().subscribe(

      (donneeRecup:any[])=>{

        this.responsables = donneeRecup;
        //console.log(donneeRecup);
        
      },

      (error)=>{console.log("Une erreur rencontrée lors de la recuperations des données , ereur du type "+error);
      },

      ()=>{console.log("Observable completee");
      }
    );

  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
    
    }
    
  }

  refreshData(){
    
  }

  //methode d'ajout d'un administrateur
  ajouterAdministrateur():void{

    
    this.isaddManager = true;

    //this.resetForm();
    

  }

  //methode de gestgion des roles
  gererRoles():void{

    this.router.navigate(['roles']);
  }

  onDelete(data:Account){
    

      if(confirm('Voulez-vous réellement supprimer ?') ==true){
        this.responsableService.deleteResponsable(data).subscribe(
          (value)=>{
          },
          (error)=>{
            console.log(error);
          }
        );
      }
      this.emitdataResponsable();
  }



  onEdit(responsable:Account){
    this.isaddManager=true;
    this.onUpdating = true;
    this.responsableForm.get('responsableInfos').get('_id').setValue(responsable._id);
    this.responsableForm.get('responsableInfos').get('nom').setValue(responsable.nom);
    this.responsableForm.get('responsableInfos').get('prenom').setValue(responsable.prenom);
    this.responsableForm.get('responsableInfos').get('email').setValue(responsable.email);
    this.responsableForm.get('responsableInfos').get('password').setValue(responsable.password);
    this.responsableForm.get('responsableInfos').get('telephone').setValue(responsable.telephone);
    this.responsableForm.get('responsableInfos').get('role').setValue(responsable.role);
    
    

   // console.log(this.account);
    
  }

  onDetailOpen($event){}

  getFormsData(){
    this.account._id=this.responsableForm.get('responsableInfos').get('_id').value;
    this.account.nom = this.responsableForm.get('responsableInfos').get('nom').value;
    this.account.prenom = this.responsableForm.get('responsableInfos').get('prenom').value;
    //this.account.password = this.responsableForm.get('responsableInfos').get('password').value;
    this.account.telephone = this.responsableForm.get('responsableInfos').get('telephone').value;
    this.account.email = this.responsableForm.get('responsableInfos').get('email').value;
    this.account.role = this.responsableForm.get('responsableInfos').get('role').value;

  }

  onAddManager():void{

    this.getFormsData(); 
    console.log(this.account);
       
    this.responsableService.sendResponsable(this.account).subscribe(()=>{console.log("obervableS");
    this.isaddManager=false;
    });   
    this.emitdataResponsable();

  }
  onCancel(){
    this.isaddManager = false;
  }

  onUpdateManager(data:Account){

    this.getFormsData();    

    this.responsableService.updateResponsable(data).subscribe(()=>{console.log("obervableS");
  });
    this.isaddManager=false;

  }

  ngOnDestroy(): void {
    
    this.respSub.unsubscribe();
  }
}
