import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { airplaneIcon, ClarityIcons, cogIcon, employeeGroupIcon, euroIcon, flaskIcon, formIcon, fuelIcon, homeIcon, noteIcon, truckIcon, userIcon, wrenchIcon } from '@cds/core/icon';
import { Client } from 'src/app/models/client';
import { Entreprise } from 'src/app/models/entreprise';
import { Particulier } from 'src/app/models/particulier';
import { administrationService } from 'src/app/services/administration.service';

@Component({
  selector: 'app-adminatration-page',
  templateUrl: './adminatration-page.component.html',
  styleUrls: ['./adminatration-page.component.css']
})
export class AdminatrationPageComponent implements OnInit {

  responsable:any[]=[
    {name:'kalmogo',lastName:'lucien', dateCreation:'05/04/2022',role:'Gestionnaire de parc'},
    {name:'Ouedraogo',lastName:'ousmane', dateCreation:'05/04/2022',role:'Gestionnaire de la logistique'},
    {name:'kouadio',lastName:'Armel', dateCreation:'05/04/2022',role:'Administrateur'}
  ]

  donnees:any[];
   operations:any[];

   privileges:any[];
   privilegesParc:any[]=[];
   privilegesLog:any[]=[];
   privilegesChauffeur:any[]=[];


   isAdmindetail:boolean = true;
  hidden:boolean  = true;

  isaddManager:boolean = false;
  navigationTab:any[] = [];
  isref: boolean;


  constructor(

    private router:Router,
    private route:ActivatedRoute,
    private aserv:administrationService
    ) {
    this.navigationTab.push("/adminPage");
   }

  ngOnInit(): void {
    ClarityIcons.addIcons(userIcon,cogIcon,airplaneIcon,flaskIcon
      ,truckIcon,cogIcon,flaskIcon
      ,homeIcon,noteIcon,fuelIcon,formIcon,wrenchIcon,
      euroIcon,employeeGroupIcon);

    setTimeout(()=>{
      this.isref = this.aserv.status;
    },5);


  }

  //methode d'ajout d'un administrateur
  ajouterAdministrateur():void{
    this.isaddManager = true;
  }

  //methode de gestgion des roles
  gererRoles():void{
    this.hiddenAdimPageContent();
    this.router.navigate(['roles',true],{relativeTo:this.route});
  }

  onDelete(responsable){
    this.responsable.pop()
  }
  goToAdminPage(){

    this.isAdmindetail =  this.aserv.displayAdminPageContent
    this.isref = this.aserv.status;
    this.router.navigate(['/adminPage']);
  }

  onEdit(responsable){}

  onDetailOpen($event){}

  hiddenAdimPageContent(){
    this.isAdmindetail =  this.aserv.hiddenAdimPageContent;
   }

  onAddManager():void{
  }


  onCancel(){
    this.isaddManager = false;
  }
  adminLinkClicked(){}

   hiddenElement(result){

  }


monotoring(){
  this.hiddenAdimPageContent();
  this.router.navigate(['inventairePanne'], {relativeTo:this.route});

}
addCar(){
  this.hiddenAdimPageContent();
  this.router.navigate(['updateVehicule'], {relativeTo:this.route})
}
addDriver(){
  this.hiddenAdimPageContent();
  this.router.navigate(['updateChauffeur'], {relativeTo:this.route});

}

addClient(){
  this.hiddenAdimPageContent();
  this.router.navigate(['client'], {relativeTo:this.route});

}
addProducts(){
  this.hiddenAdimPageContent();
  this.router.navigate(['produits'], {relativeTo:this.route});

}
addTown(){
  this.hiddenAdimPageContent();
  this.router.navigate(['updateVille'], {relativeTo:this.route});

}
addTools(){
  this.hiddenAdimPageContent();
  this.router.navigate(['pieces'], {relativeTo:this.route});

}

addPath(){
  this.hiddenAdimPageContent();
  this.router.navigate(['updateVille'], {relativeTo:this.route});

}


}
