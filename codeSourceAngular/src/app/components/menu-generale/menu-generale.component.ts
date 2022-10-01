import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

//importer pour clarity
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@cds/core/password/register.js';
import '@cds/core/icon/register.js';

import {
    ClarityIcons, cogIcon, flaskIcon,
   homeIcon, noteIcon, truckIcon
   ,fuelIcon,formIcon,wrenchIcon,euroIcon, employeeGroupIcon
  } from '@cds/core/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { administrationService } from 'src/app/services/administration.service';
@Component({
  selector: 'app-menu-generale',
  templateUrl: './menu-generale.component.html',
  styleUrls: ['./menu-generale.component.css']
})
export class MenuGeneraleComponent implements OnInit,OnDestroy {

  @Input()  exercice_id;
  @Output() adminLinkClicked = 'false';


  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private adminService:administrationService
    ) { }


  ngOnInit(): void {
    //
    ClarityIcons.addIcons(truckIcon,cogIcon,flaskIcon
      ,homeIcon,noteIcon,fuelIcon,formIcon,wrenchIcon,
      euroIcon,employeeGroupIcon);
  }
get isactivated():boolean{
    return true;
}

goTripPlan(){
  this.router.navigate(['programmation',this.exercice_id], {relativeTo:this.route});
}

goTodepenses(){
  this.router.navigate(['depenses',this.exercice_id], {relativeTo:this.route})
}

goToRecettes(){
  this.router.navigate(['recettes',this.exercice_id], {relativeTo:this.route})
}

goToRentabil(){
  this.router.navigate(['rentabiliteVehicule',this.exercice_id], {relativeTo:this.route})
}

goToActivityDriver(){
  this.router.navigate(['activiteChauffeur',this.exercice_id], {relativeTo:this.route})
}

InventPanne(){
  this.router.navigate(['inventairePanne',this.exercice_id], {relativeTo:this.route})
}

goToActiviteMaint(){
  this.router.navigate(['inventairePanne',this.exercice_id], {relativeTo:this.route})
}

OnPrintGlobalFinance(){
  alert("bilan financier global en cours implementation")
}

/*--------*/

monotoring(){
  this.router.navigate(['inventairePanne'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}

gotoAdminPage(){
  this.router.navigate(['adminPage'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addCar(){
  this.router.navigate(['updateVehicule'], {relativeTo:this.route});
  this.adminService.status = false;
}
addDriver(){
  this.router.navigate(['updateChauffeur'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addTraffic(){
  this.router.navigate(['updateTraffic'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addClient(){
  this.router.navigate(['inventairePanne'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addProducts(){
  this.router.navigate(['inventairePanne'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addTown(){
  this.router.navigate(['updateVille'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addTools(){
  this.router.navigate(['inventairePanne'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}
addCountry(){
  this.router.navigate(['updatePays'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}

addPath(){
  this.router.navigate(['trajet'], {relativeTo:this.route});
  this.adminLinkClicked = 'true';
}



ngOnDestroy(): void {

}
}
