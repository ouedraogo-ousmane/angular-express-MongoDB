import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';
import { PieceEchangee } from '../../models/piece-echangee';
import { PiecesService } from '../../services/pieces.service';
import { Vehicules } from '../../models/vehicules';
import { Maintenance } from 'src/app/models/maintenance';
import { Enregistrement } from '../../models/enregistrement';
import { MaintenanceService } from '../../services/maintenance.service';
import { EnregistrementService } from '../../services/enregistrement.service';
import { VehiculesService } from '../../services/vehicules.service';

@Component({
  selector: 'app-depenses-maintenance',
  templateUrl: './depenses-maintenance.component.html',
  styleUrls: ['./depenses-maintenance.component.css']
})
export class DepensesMaintenanceComponent implements OnInit {

  /**
   * Declaration des classes
   */
  vehicule:Vehicules=new Vehicules(null,null,null,null,null,null,null,null,null);
  listeVehicule:Vehicules[]=[];
  maintenance:Maintenance=new Maintenance(null,null,null,null,null,null);
  enregistrement = new Enregistrement(null,null,null,null,null,null);


  navigationTab = [];
  imageData: string;
  pieceForm=new FormGroup({});

  pieceListe:PieceEchangee[];
  maintenanceListe:any[];
  piece=new PieceEchangee(null,null,null,null);

  /**
   * Declaration des booléens
   */
   makeSelected:boolean =false;
   onUpdating:boolean=false;
  backup: boolean =false;
  openCarSave: boolean =false;
  carSaveForm:FormGroup  = new FormGroup({});
  dataReturn: Maintenance;
  pieceReturn:PieceEchangee;
  pieceUpdated: boolean =false;
  maintenanceUpdated: boolean=false;

  constructor(
    private fb:FormBuilder,

    private pieceService:PiecesService,

    private route:ActivatedRoute,

    private maintenanceService:MaintenanceService,

    private enregistrementService:EnregistrementService,

    private vehiculeService:VehiculesService,

     
    private router:Router
  ) { }

  ngOnInit(): void {

     //clarity icons
     ClarityIcons.addIcons(userIcon,airplaneIcon);

     this.pieceForm = this.fb.group({
       _id:this.fb.control(''),
       piece:this.fb.control('',Validators.required),
       vehicule:this.fb.control('',Validators.required),
       montant:this.fb.control('',Validators.required),
       dureeDeVie:this.fb.control('',Validators.required),
       echangeDate:this.fb.control('',Validators.required),
       quantite:this.fb.control('',Validators.required),
       cout:this.fb.control('',Validators.required),
       motif:this.fb.control('',Validators.required),
       commentaire:this.fb.control(''),
       idPiece:this.fb.control(''),
       idMaintenance:this.fb.control('')


     });
     this.emitData();
     this.emitDataVehicule();
     this.emitEnregistrement();

  }
  onEdit(enregistrement:any){
    this.backup=false;
    this.onUpdating = true;
    this.pieceForm.get('_id').setValue(enregistrement._id);
    this.pieceForm.get('piece').setValue(enregistrement.piece);
    this.pieceForm.get('vehicule').setValue(enregistrement.vehiculeId);
    this.pieceForm.get('montant').setValue(enregistrement.montant);
    this.pieceForm.get('motif').setValue(enregistrement.motif);
    this.pieceForm.get('quantite').setValue(enregistrement.quantite);
    this.pieceForm.get('echangeDate').setValue(enregistrement.dateEntree);
    this.pieceForm.get('cout').setValue(enregistrement.cout);
    this.pieceForm.get('idPiece').setValue(enregistrement.idPiece);
    this.pieceForm.get('idMaintenance').setValue(enregistrement.idMaintenance);
  }

  onCancel(){
    this.backup = true;
    this.makeSelected = true;
    this.pieceForm.reset();
  }
 
  emitData(){

    this.pieceService.getDataFromServer().subscribe(
      (value:any[])=>{
        this.pieceListe=value;
      },
      (error)=>{
        console.log("Erreur survenu du type "+error)
      },
      ()=>{
        console.log("données recuperee avec succès");
      }
      
      );


  }

  emitDataVehicule():void{
    this.vehiculeService.getDataFromServer().subscribe(
      (dataRecup:any[])=>{
        this.listeVehicule=dataRecup;
      }
    );
  }

  emitEnregistrement():void{
    this.enregistrementService.getAllMaintenanceData().subscribe(
      (data)=>{
        this.maintenanceListe = data;
        console.log(data);
      }
      );

  }
  //the interface work only when you are clicked on the new button
  isNewSaving():void{
    this.makeSelected = false;
    this.backup = false;
    this.onUpdating = false;
  }
  getAll():void{

    //1-Les pieces
    this.piece._id = new Object(this.pieceForm.get('idPiece').value);
    this.piece.nom = this.pieceForm.get('piece').value;
    this.piece.dureeDeVie =5;

    // 2-les maintenance

    this.maintenance.motif =this.pieceForm.get('motif').value;
    this.maintenance._id =this.pieceForm.get('idMaintenance').value;
    this.maintenance.commentaire =this.pieceForm.get('commentaire').value;
    this.maintenance.cout= this.pieceForm.get('cout').value;
    this.maintenance.vehicule = new Object(this.pieceForm.get('vehicule').value);
    this.maintenance.exercice =null;

    // 3-les enregistrements
    this.enregistrement.quantite =this.pieceForm.get('quantite').value;
    this.enregistrement._id = new Object(this.pieceForm.get('_id').value);
    this.enregistrement.montant =this.pieceForm.get('montant').value;
    this.enregistrement.dateEntree = new Date(this.pieceForm.get('echangeDate').value);

  }


  isSave(){
    this.backup = true;
    this.makeSelected = true;
    this.getAll();
    this.isSaveMaintenance();
    this.emitData();

  }

  isSavePiece(){
    console.log(this.piece);  //test de recuperation des données du formulaire
    this.pieceService.sendPiece(this.piece).subscribe(
      (data:any)=>{
        this.pieceReturn=data;
        console.log("pièce enregistrée avec succès");
        this.isSaveEnregistrement();
        
      }
    );
   // this.emitData();

  }

  isSaveEnregistrement(){
    this.enregistrement.piece=this.pieceReturn._id;
    this.enregistrement.activite=this.dataReturn._id;
    console.log(this.enregistrement);  //test de recuperation des données du formulaire
    this.enregistrementService.sendEnregistrement(this.enregistrement).subscribe(
      (data:any)=>{
        //this.dataReturn=data;
        console.log("enregistrement envoyées avec succès");
        this.emitEnregistrement();
        
      }
    );
    

  }

  isSaveMaintenance(){
    console.log(this.piece);  //test de recuperation des données du formulaire
    this.maintenanceService.sendMaintenance(this.maintenance).subscribe(
      (data:any)=>{
        this.dataReturn=data;
        console.log(this.dataReturn);
        console.log("données envoyées avec succès");
        this.isSavePiece();
        
      }
    );
    this.emitData();

  }

  updateData(){
    this.getAll();
    this.updatePiece();
    this.updateMaintenance();
    this.updateEnregistrement();
    this.emitEnregistrement();


    /*if(this.pieceUpdated ===true || this.maintenanceUpdated===true){
      this.updateEnregistrement();
      this.pieceUpdated=false;
      this.maintenanceUpdated=false;
    }*/
  }

  /**
   * Modification dans la table piece
   */
  updatePiece(){
    this.pieceService.updatePiece(this.piece).subscribe(
      (data)=>{
        this.pieceUpdated=true;
        console.log("données mis à jour ",data);
        this.pieceReturn=data;
      }
      
      );
  }
 /**
  * Modification dans la table maintenance
  */
  updateMaintenance(){
    this.maintenanceService.updateMaintenance(this.maintenance).subscribe(
      (data)=>{
        this.maintenanceUpdated=true;
        console.log("données mis à jour ",data);
        this.dataReturn=data;

      }
      
      );
  }

  /**
   * Modification dans la table Enregistrement
   */
  updateEnregistrement(){
    this.enregistrement.piece=this.pieceReturn._id;
    this.enregistrement.activite=this.dataReturn._id;
    this.enregistrementService.updateEnregistrement(this.enregistrement).subscribe(
      (data)=>{
        console.log("données mis à jour ",data)
        
        
      }
      
      );
  }
  onDelete(data:any){
    this.enregistrementService.deleteEnregistrement(data._id).subscribe(
      (data)=>{
        console.log("données supprimées avec succès ",data);
    });
    this.maintenanceService.deleteMaintenance(data.idMaintenance).subscribe(
      (data)=>{
        console.log("données supprimées avec succès ",data);
    });
    this.pieceService.deletePiece(data.idPiece).subscribe(
      (data)=>{
        console.log("données supprimées avec succès ",data);
    });
    this.emitEnregistrement(); 
  }

 

  gotoDepenseM(){
    this.router.navigate(['depenseMaintenance'],{relativeTo:this.route});
    
  }
  
  gotoDepenseMain(){
    this.router.navigate(['depenseMission'],{relativeTo:this.route});
  }

 


}
