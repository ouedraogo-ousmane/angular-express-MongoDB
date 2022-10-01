import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { administrationService } from 'src/app/services/administration.service';
import '@cds/core/alert/register.js';
import { ClarityIcons, pencilIcon, trashIcon, windowCloseIcon } from '@cds/core/icon';
import { VilleService } from '../../services/ville.service';
import { TrajetService } from '../../services/trajet.service';
import { Trajet } from '../../models/trajet';
import { Ville } from 'src/app/models/ville';
import { Pays } from '../../models/pays';
@Component({
  selector: 'app-creation-ville',
  templateUrl: './creation-ville.component.html',
  styleUrls: ['./creation-ville.component.css']
})
export class CreationVilleComponent implements OnInit {

  /*listePays=[{name:'Burkina Faso', ville1:'Bobo dioulasso',ville2:'Ouagadougou',dateCreation:'10/02/2022'},
             {name:'Cote d\'Ivoire', ville1:'Abidjan',ville2:'Bouaké',dateCreation:'10/02/2022'},
             {name:'Ghana', ville1:'Acra',ville2:'Koumassi',dateCreation:'10/02/2022'} ]*/

  openModal:boolean          = false;
  addCountriesForm:FormGroup = new FormGroup({});
  addCitiesForm:FormGroup    = new FormGroup({});
  addPathForm:FormGroup      = new FormGroup({});
  openPathModal:boolean      = false;
  openCitiesModal:boolean    = false;
  openCountriesModal         = false

  listeTrajet                = [];
  listeVille                 = [];
  listePays                  = [];
  //listePays                  = [];
  trajet : Trajet            = new Trajet(null,null,null,null,null);
  ville  : Ville             = new Ville(null,null,null);
  pays   : Pays              = new Pays(null,null,null);

  constructor(
    private fb:FormBuilder,
    private adminService:administrationService,
    private villeService : VilleService,
    private trajetService : TrajetService
  ) { }

  ngOnInit(): void {

    ClarityIcons.addIcons(windowCloseIcon,trashIcon,pencilIcon)

    //formulaire d'ajout
    this.addCountriesForm = this.fb.group({
      nomPays:this.fb.control('',Validators.required)
    });

    this.addCitiesForm = this.fb.group({
      nomPays:this.fb.control('',Validators.required),
      nomVille:this.fb.control('',Validators.required)
    });

    this.addPathForm = this.fb.group({
      villeDepart:this.fb.control('',Validators.required),
      villeArrivee:this.fb.control('',Validators.required)
    });

    this.adminService.isRefreshAdminPage();
    this.emit();
    this.emitVille();
    this.emitPays();
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

 /***
  * Declarations des emitteurs
  */

 emit(){
   this.trajetService.getDataFromServer().subscribe(
     (data)=>{
       this.listeTrajet = data;
     }
    );
 }


 emitVille(){
  this.villeService.getDataFromServer().subscribe(
    (data)=>{
      this.listeVille = data;
    }
   );
 }

 emitPays(){
  this.villeService.getDataFromServerCountry().subscribe(
    (data)=>{
      this.listePays = data;
    }
   );
 }

 /**
  * 
  * @param declaration des methodes de recuperations des données des formulaires 
  * 
  */
getCountryForms(){
  this.pays.nom = this.addCountriesForm.get('nomPays').value;
  this.pays.dateCreation = new Date();
  console.log(this.addCountriesForm.get('nomPays').value);  
  
}

getCityForms(){
  this.ville.nom = this.addCitiesForm.get('nomVille').value;
  this.ville.pays = this.addCitiesForm.get('nomPays').value;

}

getPathForms(){
  this.trajet.villeA = this.addPathForm.get('villeDepart').value;
  this.trajet.villeD = this.addPathForm.get('villeArrivee').value;
}

/**
 * 
 * @para
 */


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
    this.onCancelCountriesModal();
    this.getCountryForms();
    /*
    this.villeService.sendCountry(this.pays).subscribe(
      ()=>{
        alert("données envoyées avec succès ");
        this.emitPays();
      }
    )*/
  }
  addNewCities(){
    //ouverture du modal
             this.openModal = true;
    this.openCitiesModal    = true;
  }
  sendCities(){
    this.onCancelCitiesModal();
    this.getCityForms();
    this.villeService.sendVille(this.ville).subscribe(
      ()=>{
        alert("données envoyées avec succès ");
        this.emitVille();
      }
    )
  }

  addNewPath(){
    //ouverture du modal
    this.openModal       = true;
    this.openPathModal   = true;

  }

  sendPath(){
    this.onCancelPathModal();
    this.getPathForms();
    this.trajetService.sendTrajet(this.trajet).subscribe(
      ()=>{
        alert("données envoyées avec succès ");
        this.emit();
      }
    )
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
