import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class administrationService {

  isAdmindetail:boolean;
  status:boolean = false;

  constructor(
    private router:Router,
    private route:ActivatedRoute
    ) { }

   isRefreshAdminPage(){
    this.status = true;
    this.isAdmindetail = false;
  }

  get  hiddenAdimPageContent(){
    this.isAdmindetail = false;
     return this.isAdmindetail ;
    }

  get displayAdminPageContent(){
    this.status = false;
    this.isAdmindetail = true;
     return this.isAdmindetail ;
  }
}
