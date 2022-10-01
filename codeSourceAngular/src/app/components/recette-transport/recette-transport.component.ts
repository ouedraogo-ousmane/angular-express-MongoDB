import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';

import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@cds/core/password/register.js';
import '@cds/core/icon/register.js';
import '@cds/core/modal/register.js';
import { RecetteTransport } from '../../models/recette-transport';
import { ClientsService } from '../../services/clients.service';
import { ProduitService } from '../../services/produit.service';
import { RecetteTransportService } from '../../services/recette-transport.service';
@Component({
  selector: 'app-recette-transport',
  templateUrl: './recette-transport.component.html',
  styleUrls: ['./recette-transport.component.css']
})
export class RecetteTransportComponent implements OnInit {

  recetteForm: FormGroup =new FormGroup({});
  makeSelected: boolean =true;
  backup: boolean =true;
  onUpdating:boolean = false;
  navigationTab = [];
  today=new Date();
 
  open: boolean = false;

  recetteListe : RecetteTransport[] =[];
  missionListe = [];
  produitListe = [];
  clientListe  = [];

  recette :RecetteTransport  = new RecetteTransport(null,null,null,null,null,null,null);

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private clientService : ClientsService,
    private produitService : ProduitService,
    private recetteService : RecetteTransportService
  ) { }

 
  ngOnInit(): void {

    //clarity icons
    ClarityIcons.addIcons(userIcon,airplaneIcon);

    this.recetteForm = this.fb.group({
      _id:this.fb.control(''),
      mission:this.fb.control('',Validators.required),
      produit:this.fb.control('',Validators.required),
      montant:this.fb.control('',Validators.required),
      dateEntree:this.fb.control('',Validators.required),
      quantite:this.fb.control('',Validators.required),
      prix:this.fb.control('',Validators.required),
      client:this.fb.control('',Validators.required)

    });

    // receuperation des clients
    this.clientService.getClients().subscribe(
      (data)=>{
        this.clientListe = data;
        console.log(this.clientListe);

      }
    );

    // Recuperation des produits

    this.produitService.getDataFromServer().subscribe(
      (data)=>{
        this.produitListe = data;
        console.log(this.produitListe);

      }
    );
  }

  /**
   * methode de recuperation des données dans le formulaire
   */

  getFormsData(){
    this.recette._id = new Object(this.recetteForm.get('_id').value);
    this.recette.coutUnitaire = this.recetteForm.get('prix').value;
    this.recette.dateEntree = this.recetteForm.get('dateEntree').value;
    this.recette.idClient = new Object(this.recetteForm.get('client').value);
    this.recette.idProduit = new Object(this.recetteForm.get('produit').value);
    this.recette.quantite =  this.recetteForm.get('quantite').value;
    this.recette.idMission = new Object("62122ac4ecb4b088221ab9c7");
  }

  /**
   * Methode d'affectation des données
   */

  isNewSaving(){

  }

  onCancel(){
    this.backup = true;
    this.makeSelected = true;
    this.recetteForm.reset();
  }

  isSave(){
    this.backup = true;
    this.makeSelected = false;
    this.getFormsData();
    this.recetteService.sendRecette(this.recette).subscribe(
      (data)=>{
        console.log("données envoyées avec succès");
        
      }
    )
  }

  onEdit(recette){
    this.makeSelected = false;
    this.backup = false;
    this.recetteForm.get('_id').setValue(recette._id);
    this.recetteForm.get('prix').setValue(recette.coutUnitaire);
    this.recetteForm.get('dateEntree').setValue(recette.dateEntree);
    this.recetteForm.get('client').setValue(recette.idClient);
    this.recetteForm.get('produit').setValue(recette.idProduit);
    this.recetteForm.get('quantite').setValue(recette.quantite);

  }


  onDelete(recette){

    this.recetteService.deleteRecette(recette).subscribe(
      (data)=>{
        // alert("Suppressionloçà) des données avec succès");

      }
    );

  }

  updateData(){
    this.recetteService.updateRecette(this.recette).subscribe(
      (data)=>{
        alert("Modification des données avec succès");

      }
    );

  }

  handleDone(i){

  }
}
