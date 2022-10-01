import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { administrationService } from 'src/app/services/administration.service';
import '@cds/core/alert/register.js';
import { ClarityIcons, windowCloseIcon } from '@cds/core/icon';
@Component({
  selector: 'app-creation-ville',
  templateUrl: './creation-ville.component.html',
  styleUrls: ['./creation-ville.component.css']
})
export class CreationVilleComponent implements OnInit {

  listePays=[{name:'Burkina Faso', ville1:'Bobo dioulasso',ville2:'Ouagadougou',dateCreation:'10/02/2022'},
             {name:'Cote d\'Ivoire', ville1:'Abidjan',ville2:'Bouaké',dateCreation:'10/02/2022'},
             {name:'Ghana', ville1:'Acra',ville2:'Koumassi',dateCreation:'10/02/2022'} ]

  openModal:boolean          = false;
  addCountriesForm:FormGroup = new FormGroup({});
  addCitiesForm:FormGroup    = new FormGroup({});
  addPathForm:FormGroup      = new FormGroup({});
  openPathModal:boolean      = false;
  openCitiesModal:boolean    = false;
  openCountriesModal         = false

  constructor(
    private fb:FormBuilder,
    private adminService:administrationService
  ) { }

  ngOnInit(): void {

    ClarityIcons.addIcons(windowCloseIcon)

    //formulaire d'ajout
    this.addCountriesForm = this.fb.group({
      nomPays:this.fb.control('',Validators.required
      )});

    this.addCitiesForm = this.fb.group({
      nomPays:this.fb.control('',Validators.required),
      nomVille:this.fb.control('',Validators.required)
    });

    this.addPathForm = this.fb.group({
      villeDepart:this.fb.control('',Validators.required),
      villeArrivee:this.fb.control('',Validators.required)
    });

    this.adminService.isRefreshAdminPage();
  }

  /**----valiation des formulairs ----- */
 get isCountriesValid(){
   if(this.addCountriesForm.get('nomPays').valid == true) return false;
   return true;
 }

 get isPathValid(){
  if((this.addPathForm.get('villeDepart').valid && this.addPathForm.get('villeArrivee').valid ) == true) return false;
  return true;
 }

 get isCitiesValid(){
  if((this.addCitiesForm.get('nomPays').valid && this.addCitiesForm.get('nomVille').valid ) == true) return false;
  return true;
 }

/** --------------action sur pays ---------- */
  onEdit(pays){}
  onDelete(pays){}
  onDetailOpen(event){
      console.log(event);
  }

  /*-----------Enregistrement de donnée--------------------*/
  addNewCountries(){
    //ouverture du modal
             this.openModal = true;
    this.openCountriesModal = true;
  }

  sendCountries(){
    this.onCancelCountriesModal()
  }
  addNewCities(){
    //ouverture du modal
             this.openModal = true;
    this.openCitiesModal    = true;
  }
  sendCities(){
    this.onCancelCitiesModal();
  }

  addNewPath(){
    //ouverture du modal
             this.openModal = true;
    this.openPathModal      = true;

  }

  sendPath(){
    this.onCancelPathModal();
  }
/* ----------------fermeture des modal ---------- */
  onCancelCountriesModal(){
            this.openModal  = false;
    this.openCountriesModal = false;
     this.addCountriesForm.reset();
  }
  onCancelCitiesModal(){
            this.openModal  = false;
    this.openCitiesModal    = false;
     this.addCitiesForm.reset();
  }
  onCancelPathModal(){
           this.openModal  = false;
   this.openPathModal      = false;
   this.addPathForm.reset();
  }
/**---------------- */

}
