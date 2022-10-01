import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';


@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements OnInit {


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

  gotoDepenseM(){
    this.router.navigate(['depenseMission'],{relativeTo:this.route});
    this.isNavClicked1 = true;
    this.isNavClicked2 = false;
  }

  gotoDepenseMain(){
    this.router.navigate(['depenseMaintenance'],{relativeTo:this.route});
    this.isNavClicked2 = true;
    this.isNavClicked1 = false;
  }

  


}
