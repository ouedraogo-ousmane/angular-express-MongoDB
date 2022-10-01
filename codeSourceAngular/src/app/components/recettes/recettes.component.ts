import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {
  
  navigationTab = [];


  backup: boolean;
  isNavClicked2: boolean = false;
  isNavClicked1: boolean = true;


  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    //clarity icons
    ClarityIcons.addIcons(userIcon,airplaneIcon);
 }

 gotoRecettePesage(){
   this.router.navigate(['recettePesage'],{relativeTo:this.route});
   this.isNavClicked1 = true;
   this.isNavClicked2 = false;
 }

 gotoRecetteTransport(){
   this.router.navigate(['recetteTransport'],{relativeTo:this.route});
   this.isNavClicked2 = true;
   this.isNavClicked1 = false;
 }


}
