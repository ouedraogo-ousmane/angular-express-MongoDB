import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import '@cds/core/icon/register.js';
import '@cds/core/checkbox/register.js';




import { airplaneIcon, ClarityIcons, cogIcon, flaskIcon, userIcon } from '@cds/core/icon';
import { RolesService } from 'src/app/services/roles.service';
import { Subscription } from 'rxjs';
import { Privileges } from '../../models/privileges';
import { Chauffeur } from '../../interfaces/chauffeur';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit,OnDestroy {

  private role:object=sessionStorage.roles;

   donnees:any[];
   operations:any[];

   privileges:any[];
   privilegesParc:any[]=[];
   privilegesLog:any[]=[];
   privilegesChauffeur:any[]=[];


  private roleSub:Subscription;
  private privilegeSub:Subscription;

  constructor(private router :Router,
    private roleService:RolesService) { }

  ngOnInit(): void {
    /*this.roleSub = this.roleService.getRolesDataFromServer().subscribe(
      (data)=>{
        this.donnees = data;
        this.operations = this.donnees[1].operations;
        //console.log(this.operations)
      },
      (error)=>{
        alert("error" + error)
      })
      */
    this.privilegeSub = this.roleService.getAllprivileges().subscribe(
      (data)=>{
       // console.log(data)

        for(let tab of data){
          if(tab.role ==="61e6e738485ed903d8df5aa4"){
            this.privilegesParc.push(tab);

          }
          else if(tab.role ==="61e6e753485ed903d8df5aa8"){
            this.privilegesLog.push(tab);
          }
          else{
            this.privilegesChauffeur.push(tab);
          }
        }
        console.log(this.privilegesLog);
        
      })
      this.operations=this.privilegesChauffeur;
      

  }
  chauffeurdata(){
    this.operations=this.privilegesChauffeur;

  }

  parcdata(){
    this.operations=this.privilegesParc;
  }

  logdata(){
    this.operations=this.privilegesLog;
  }

  updateTable(i){
    alert(this.operations[i].read)
  }

  ngOnDestroy(): void {
      this.roleSub.unsubscribe() 
  }

}
