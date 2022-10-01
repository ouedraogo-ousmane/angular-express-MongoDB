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
import { RecettePesage } from 'src/app/models/recette-pesage';
@Component({
  selector: 'app-recette-pesage',
  templateUrl: './recette-pesage.component.html',
  styleUrls: ['./recette-pesage.component.css']
})
export class RecettePesageComponent implements OnInit {
  recetteForm: FormGroup =new FormGroup({});
  makeSelected: boolean =true;
  backup: boolean =true;
  onUpdating:boolean = false;
  navigationTab = [];
  today=new Date();
 
  open: boolean = false;

  recetteListe : RecettePesage[] =[];
  missionListe = [];


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder
  ) { }


  ngOnInit(): void {

    //clarity icons
    ClarityIcons.addIcons(userIcon,airplaneIcon);

    this.recetteForm = this.fb.group({
      _id:this.fb.control(''),
      mission:this.fb.control('',Validators.required),
      produit:this.fb.control('',Validators.required),
      montant:this.fb.control('',Validators.required),
      numPesee:this.fb.control('',Validators.required),
      dateEntree:this.fb.control('',Validators.required),
      firstSize:this.fb.control('',Validators.required),
      secondSize:this.fb.control('',Validators.required),
      prix:this.fb.control('',Validators.required),
      client:this.fb.control('',Validators.required),

    });
  }

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
  }

  onEdit(recette){
    this.makeSelected = false;
    this.backup = false;
  }


  onDelete(recette){

  }

  updateData(){

  }

  handleDone(i){

  }

}
