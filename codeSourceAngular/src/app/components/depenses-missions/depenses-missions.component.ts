import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';
import { PieceEchangee } from '../../models/piece-echangee';
import { PiecesService } from '../../services/pieces.service';
import { Depense } from '../../models/depense';
import { AnyCnameRecord } from 'dns';
import { DepensesMissionsService } from '../../services/depenses-missions.service';

@Component({
  selector: 'app-depenses-missions',
  templateUrl: './depenses-missions.component.html',
  styleUrls: ['./depenses-missions.component.css']
})
export class DepensesMissionsComponent implements OnInit {


  navigationTab = [];
  imageData: string;
  depenseMissionForm=new FormGroup({});

  pieceListe:PieceEchangee[];

  piece=new PieceEchangee(null,null,null,null);

  /**
   * Declaration des booléens
   */
   makeSelected:boolean =true;
   onUpdating:boolean=false;
   backup: boolean;
   listeDepense:any[]=[
     {
       _id:null,
       libelle:"cout du transport",
       mission:new Object("452UKG"),
       montant:300000,
       vehicule:"FBNJKK5215J",
       dateDepense:new Date()
     },
     {
      _id:null,
      libelle:"Frais de pesage",
      mission:new Object("45210UKG"),
      montant:45000,
      vehicule:"FBNJKK5215J",
       dateDepense:new Date()
    },
    {
      _id:null,
      libelle:"salaire",
      mission:new Object("4782UKG"),
      montant:150000,
      vehicule:"FBNJKK5215J",
      dateDepense:new Date()
    },
    {
      _id:null,
      libelle:"comission",
      mission:new Object("452UKG"),
      montant:30000,
      vehicule:"FBNJKK5215J",
      dateDepense:new Date()
    },
    {
      _id:null,
      libelle:"Douanes",
      mission:new Object("452UKG"),
      montant:350000,
      vehicule:"FBNJKK5215J",
      dateDepense:new Date()
    },
    ];

    depense:Depense = new Depense(null,null,null,null,null);
  constructor(
    private fb:FormBuilder,
    private depenseMissionService:DepensesMissionsService,
    private route:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {

     //clarity icons
     ClarityIcons.addIcons(userIcon,airplaneIcon);

     this.depenseMissionForm = this.fb.group({
       _id:this.fb.control(''),
       echangeDate:this.fb.control('',Validators.required),
       montant:this.fb.control('',Validators.required),
       libelle:this.fb.control('',Validators.required),
       mission:this.fb.control('',Validators.required),
       vehicule:this.fb.control('',Validators.required)
       
     });
     
     this.emitData();
     
  }

  /**
   * Methode de recuperation du formulaire
   */

  getAll():void{
    this.depense._id = this.depenseMissionForm.get('_id').value;
    this.depense.libelle = this.depenseMissionForm.get('libelle').value;
    this.depense.montant = this.depenseMissionForm.get('montant').value;
    //this.depense.mission = new Object(this.depenseMissionForm.get('mission').value);
    this.depense.mission = null;
    this.depense.date = new Date(this.depenseMissionForm.get('echangeDate').value);
  }

  emitData(){

    this.depenseMissionService.getDataFromServer().subscribe(
      (value:any[])=>{
        this.listeDepense=value;
      },
      (error)=>{
        console.log("Erreur survenu du type "+error)
      },
      ()=>{
        console.log("données recuperee avec succès");
      }
      
      );

  }

  isSave(){
    this.backup = true;
    this.makeSelected = true;
    this.getAll();
    console.log(this.depense);  //test de recuperation des données du formulaire
    this.depenseMissionService.sendDepense(this.depense).subscribe(
      (data:any)=>{
        console.log("données envoyées avec succès ",data);
        this.emitData();
      }
    );
    this.emitData();

  }

  updateDepense(){

    this.getAll()

    this.depenseMissionService.updateDepense(this.depense).subscribe(
      (data)=>{
        console.log("données mis à jour ",data);
        this.emitData();
      }
      );
  
  }

  isNewSaving(){
    this.makeSelected = false;
    this.backup = false;
    this.onUpdating = false;
  }

  onEdit(depense:any){
    this.backup=false;
    this.onUpdating = true;
    this.depenseMissionForm.get('_id').setValue(depense._id);
    this.depenseMissionForm.get('libelle').setValue(depense.libelle);
    this.depenseMissionForm.get('montant').setValue(depense.montant);
    this.depenseMissionForm.get('mission').setValue(depense.missionId);
    this.depenseMissionForm.get('echangeDate').setValue(depense.date);
   
  }

  gotoDepenseM(){
    this.router.navigate(['depenseMaintenance'],{relativeTo:this.route});
    
  }

  gotoDepenseMain(){
    this.router.navigate(['depenseMission'],{relativeTo:this.route});
  }

  onDelete(depense:any){

    this.depenseMissionService.deleteDepense(depense._id).subscribe(
      (data:any)=>{
        console.log("données supprimées avec succès ",data);
        this.emitData();
        
      }
    );

  }



}
