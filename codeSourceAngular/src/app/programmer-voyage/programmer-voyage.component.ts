import { Component, OnDestroy, OnInit } from '@angular/core';
import { airplaneIcon, ClarityIcons, userIcon } from '@cds/core/icon';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import {Subscription } from 'rxjs';


import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@cds/core/password/register.js';
import '@cds/core/icon/register.js';
import '@cds/core/modal/register.js';

import { Vehicules } from '../models/vehicules';
import { Produit } from '../models/produit';
import { Trajet } from '../models/trajet';
import { Chauffeur } from '../models/chauffeur';
import { Client } from '../models/client';


import { DocumentVehicule } from '../models/document-vehicule';
import { VehiculesService } from '../services/vehicules.service';
import { Particulier } from '../models/particulier';
import { Entreprise } from '../models/entreprise';
import { MotifDepense } from '../models/motif-depense';
import { TrajetService } from '../services/trajet.service';
import { ChauffeurService } from '../services/chauffeur.service';
import { DocumentService } from '../services/document.service';
import { ClientsService } from '../services/clients.service';
import { ProduitService } from '../services/produit.service';
import { Ville } from '../models/ville';
import { VilleService } from '../services/ville.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-programmer-voyage',
  templateUrl: './programmer-voyage.component.html',
  styleUrls: ['./programmer-voyage.component.css']
})
export class ProgrammerVoyageComponent implements OnInit ,OnDestroy{


  responsable:any[]=[
    {
      name:'vehicule 1',lastName:'client 3',
      dateCreation:'05/04/2022',role:'chauffeur 1',quantite:10,
      prod:'fer', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 2',lastName:'client 2',
     dateCreation:'05/02/2022',role:'chauffeur 2',
     quantite:5,prod:'fer', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 1',lastName:'client 3',
      dateCreation:'06/05/2022',role:'chauffeur 1',quantite:10,
      prod:'fer', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 1',lastName:'client 3',
      dateCreation:'05/03/2022',role:'chauffeur 1',quantite:30,
      prod:'tube', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 1',lastName:'client 3',
      dateCreation:'23/04/2022',role:'chauffeur 1',quantite:10,
      prod:'fer de tole', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 1',lastName:'client 3',
      dateCreation:'05/04/2022',role:'chauffeur 1',quantite:10,
      prod:'carreau', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 1',lastName:'client 3',
      dateCreation:'05/04/2022',role:'chauffeur 1',quantite:1,
      prod:'ciment', motif:'Livraison',trajet:'Bobo-Ouage'
    },
    {
      name:'vehicule 3',lastName:'client 1', dateCreation:'05/04/2022',
      role:'chauffeur 3',quantite:100,prod:'tole',
      motif:'Livraison',trajet:'Bobo-Ouage'
    }
  ]

  listeVehicule:Vehicules[]  = [];
  listeProduit:Produit[]     = [];
  listeTrajet:Trajet[]       = [];
  //listeMotif:Motif[]       = [];
  listeChauffeur:Chauffeur[] = [];
  listeClient:Client[]       = [];
  listeVille:Ville[]         = [];




  subGetExercice:Subscription;
  //variables
  tripForm:FormGroup         = new FormGroup({});
  carSaveForm:FormGroup      = new FormGroup({});
  motifSaveForm:FormGroup    = new FormGroup({});
  productSaveForm:FormGroup  = new FormGroup({});
  documentCarForm:FormGroup  = new FormGroup({});
  driverSaveForm:FormGroup   = new FormGroup({});
  clientSaveForm:FormGroup   = new FormGroup({});
  pathSaveForm:   FormGroup  = new FormGroup({});
  entrepriseForm:FormGroup   = new FormGroup({});
  personClientForm:FormGroup = new FormGroup({});

  navigationTab = [];


  makeSelected: boolean       = true;
  backup: boolean             = false;

  openCarSave:boolean         = false;
  saveProductOpen:boolean     = false;
  saveMotifOpen:boolean       = false;
  openDriverSave:boolean      = false;
  openTrajetModal:boolean     = false;
  openSaveClientModal:boolean = false;
  onIsSaveTrip:boolean        = false;

  vehiculeTobeSave:Vehicules  = new Vehicules(null,null,null,null,null,null,null,null,null);
  assurance :DocumentVehicule = new DocumentVehicule(null,null,null,null,null);
  visiteTech:DocumentVehicule = new DocumentVehicule(null,null,null,null,null);

  newClient:Client            = new Client(null,null,null,null);
  personClient:Particulier    = new Particulier(null,null,null);
  entrepriseClient:Entreprise = new Entreprise(null,null,null,null,null);
  newProduct:Produit          = new Produit(null,null,null);
  newMotif:MotifDepense       = new MotifDepense(null,null);
  newdriver:Chauffeur         = new Chauffeur(null,null,null,null,null,null,null,null,null,null);
  newpath:Trajet              = new Trajet(null,null,null,null,null)

  //information generique sur l' entreprise
  infoEntreprise = {
    telephone: '(226) 20 98 25 38',
    email    : 'QWPF2001@YAHOO.FR',
    ville    : 'BOBO-DIOULASSO',
    nom      : 'WENDLA SOABA TRANSPORT',
    pays     : 'Burkina Faso'
    }
  villeDepart: any;
  villeArrivee: any;

  constructor(
    private fb:FormBuilder,
    private vehiculeService: VehiculesService,
    private clientService:ClientsService,
    private trajetService:TrajetService,
    private chauffeurService:ChauffeurService,
    private documentService:DocumentService,
    private produitService : ProduitService,
    private villeService   : VilleService

    ) { this.navigationTab.push("/exercices");
    //pdfMake.vfs    = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {

    //clarity icons
    ClarityIcons.addIcons(userIcon,airplaneIcon);

       /** ------- forms ------------- */
        //1- planning form
    this.tripForm = this.fb.group(
      {
             tripDate:   this.fb.control('',Validators.required),
            tripCar:     this.fb.control('',Validators.required),
            tripProduct: this.fb.control('',Validators.required),
             tripReason: this.fb.control('',Validators.required),
             tripClient: this.fb.control('',Validators.required),
            tripDriver:  this.fb.control('',Validators.required),
             tripPath:   this.fb.control('',Validators.required),
        productQuantity: this.fb.control('',Validators.required)
    }
    );

       //2- save a new car informations form
    this.carSaveForm = this.fb.group({
      immatriculation:this.fb.control('',Validators.required),
      poids:this.fb.control('',Validators.required),
      capacite:this.fb.control('',Validators.required),
      fonction:this.fb.control('',Validators.required),
      dateCirculation:this.fb.control('',Validators.required),
    });

      //3- save a new car documents form
    this.documentCarForm = this.fb.group({
        assurance:this.fb.group({
        AssDateDebut:this.fb.control('',Validators.required),
        AssDateExpiration:this.fb.control('',Validators.required),
      }),

      visiteTechnique:this.fb.group({
        vTechDateDebut:this.fb.control('',Validators.required),
        vTechDateFin:this.fb.control('',Validators.required)
      })
    });

      //save a new product form
    this.productSaveForm = this.fb.group({
      intitule:this.fb.control('',Validators.required)
    });

      //save a new trip reason
    this.motifSaveForm = this.fb.group({
      motif:this.fb.control('',Validators.required)
    });

    //save a new driver  form
    this.driverSaveForm = this.fb.group({
      nomDriver:this.fb.control('',Validators.required),
      prenomDriver:this.fb.control('',Validators.required),
      adresseDriver:this.fb.control(''),
      permisDriver:this.fb.control(''),
      photoDriver:this.fb.control(''),
      dateExperation:this.fb.control(''),
    })
    //save a new client form

    this.clientSaveForm = this.fb.group({
      nomClient:this.fb.control('',Validators.required),
      telClient:this.fb.control('',Validators.required),
      adresse: this.fb.control('')
    });

    this.personClientForm = this.fb.group({
      prenomClient:this.fb.control('',Validators.required)
    })

    this.entrepriseForm = this.fb.group({
      ifuClient:this.fb.control('',Validators.required),
      logoClient:this.fb.control('',Validators.required),
      rccmclient: this.fb.control('',Validators.required)
    });

    //save a new traffic path form
    this.pathSaveForm = this.fb.group({
      typeTrajet:this.fb.control('',Validators.required),
      departVille:this.fb.control('',Validators.required),
      departPays:this.fb.control(''),
      arriveVille: this.fb.control('',Validators.required),
      arrivePays:this.fb.control('')
    })

    //data emission
    this.emitClient();
    this.emitCar();
    this.emitProduit() ;
    this.emitPath();
    this.emitDriver();
    this.emitVille();

  }

  //the interface work only when you are clicked on the new button
  isNewProgrammation():void{
    this.makeSelected = false;
    this.backup = true;
  }

  //the interface is disabled when you clicked on the save button
  isSave(): void{
    this.backup = false;
    this.makeSelected = true;
  }

  saveDocument(document:DocumentVehicule){
    this.documentService.sendDocumentVehicule(document).subscribe(
      (resp)=>{

      }
    )
  }
  saveVehicule(){

    //information cars
    this.vehiculeTobeSave.disponibilite     = true;
    this.vehiculeTobeSave.fonction          = this.carSaveForm.get("fonction").value;
    this.vehiculeTobeSave.immatriculation   = this.carSaveForm.get("immatriculation").value;
    this.vehiculeTobeSave.model             = 'benne';
    this.vehiculeTobeSave.poids             = this.carSaveForm.get("poids").value;
    this.vehiculeTobeSave.miseCirculation   = new Date();
    this.vehiculeTobeSave.image             = "car image";

    // information documents
    this.assurance.dateDebut         = new Date(this.documentCarForm.get('assurance').get("AssDateDebut").value);
    this.assurance.dateExpiration    = new Date(this.documentCarForm.get('assurance').get("AssDateExpiration").value);
    this.assurance.vehicule          =  new Object('61dc399a1a704c623a6a9c47');
    this.assurance.libelle           = 'assurance';

    this.visiteTech.dateDebut        = new Date(this.documentCarForm.get('visiteTechnique').get('vTechDateDebut').value);
    this.visiteTech.dateExpiration   = new Date(this.documentCarForm.get('visiteTechnique').get('vTechDateFin').value);
    this.visiteTech.libelle          = 'visite technique'
    this.assurance.vehicule          =  new Object('61dc399a1a704c623a6a9c47');

    this.vehiculeService.sendCar(this.vehiculeTobeSave).subscribe(
      (resp)=>{
        this.saveDocument(this.assurance);
        this.saveDocument(this.visiteTech);
       this.emitCar()
      }
    )

  }

  emitCar() {
   this.vehiculeService.getDataFromServer().subscribe(
    (resp:Vehicules[])=>{
      this.listeVehicule = resp;
    }
   )
  }



  saveEntreprise(){
    this.entrepriseClient.ifu    = this.entrepriseForm.get('ifuClient').value;
    this.entrepriseClient.logo   = this.entrepriseForm.get('logoClient').value;
    this.entrepriseClient.rccm   = this.entrepriseForm.get('rccmclient').value;
    this.entrepriseClient.Client =  new Object('61dc399a1a704c623a6a9c47');

    this.clientService.sendClientEntreprise(this.entrepriseClient).subscribe(
      (resp)=>{

      }
    )
  }
  saveParticulier(){
    this.personClient.prenom   = this.personClientForm.get("prenomClient").value;
    this.personClient.Client =  new Object('61dc399a1a704c623a6a9c47')
    this.clientService.sendClientParticulier(this.personClient).subscribe(
      (resp)=>{
        console.log(resp)
      }
    )
  }

  saveClient(){
    this.newClient.adresseClient = this.clientSaveForm.get("adresse").value;
    this.newClient.nomClient     = this.clientSaveForm.get("nomClient").value;
    this.newClient.telClient     = this.clientSaveForm.get("telClient").value;

    this.clientService.sendClient(this.newClient).subscribe(
      (resp)=>{
        if(this.personneImage ===  true){
          this.saveParticulier();
        }else{
          this.saveEntreprise();
        }
        this.emitClient();
      },
      (error)=>{

      }
    )




  }

  emitClient() {
    this.clientService.getClients().subscribe(
      (resp:Client[])=>{
        this.listeClient = resp;
      },
      (error)=>{},
      ()=>{},
    )
  }


  //print the mission bill
  onPrint(dataTobePrint): void{
    this.generateOrdreMission(dataTobePrint);
  }

  generateOrdreMission(dataTobePrint):void{
   // pdfMake.createPdf(this.ordreDeMissionPdf(dataTobePrint)).print();
  }

  ordreDeMissionPdf(dataTobePrint){

    return {

       content:[

        { //title
          text:'Ordre de Mission',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
          decoration:'underline'

        },

       {  //header
          margin: [0, 0, 0, 35],
          columns:[
           [ {
              text: this.infoEntreprise.nom,
              bold:true,
              fontSize:15,
              margin: [0, 0, 0, 5],
            },
            {text: this.infoEntreprise.email},
            {text: this.infoEntreprise.telephone},
            {text: this.infoEntreprise.ville},
            {text: this.infoEntreprise.pays}
          ],

           [{ text:"Date d'emission: 10/02/2022",style:'date'}]
          ]
      },

      { //About the transportation
        margin: [0, 0, 0, 35],
        alignment:'center',
        table:{
          headerRows:1,
          widths:['*','*','*','*'],

          body:[
            [{text:'Transporteur', bold:true}, {text:'Vehicule', bold:true}, {text:'Trajet', bold:true}, {text:'Client', bold:true}],

            [{text:dataTobePrint.role}, {text:dataTobePrint.name}, {text:dataTobePrint.trajet}, {text:dataTobePrint.lastName}]
        ]
        }
       },

       { //About the products
         alignment:'center',
        table:{
          headerRows:1,
          widths:['*','*','*','*'],

          body:[
            [{text:'Date',bold:true}, {text:'Produits',bold:true}, {text:'Motif',bold:true} ],
            [{text:dataTobePrint.dateCreation}, {text:dataTobePrint.prod}, {text:dataTobePrint.motif} ]
        ]
        }
       },

       { //signature & QR Code
        style:'sign',
        columns:[

        {
           qr: 'Metal-Wend-Panga', // text inside the QR code
            fit:100
        },
        {
          text:'signature',
          alignment:'right',
          fontSize:18,
          decoration:'underline'
        }

      ]
     },
    ],

    info:{
      title   : 'ordre de mission',
      author  : 'M.Gnamou',
      subject : 'Ordre de  mission',
      keywords: 'Ordre de  mission',
    },
    styles:{
      date:{
        alignment:'right',
        bold:true
      },
      sign: {
        margin: [0, 50, 0, 10],
        italics: true,

      },
    }
  }

  }

  //edit a plan
  onEdit(responsable): void{

  }

  //delete a trip
  onDelete(responsable): void{
  }

  /*------------------------------------ */
  //You can only save the data in the wizard when the car documents form is available
  get isDoneWizard():boolean{
    const assurance = this.documentCarForm.get("assurance").valid;
    const visiteTechnique = this.documentCarForm.get("visiteTechnique").valid;
    if( (assurance === true)&& (visiteTechnique ===true)) return false;
    return true;
  }

  //You can only  get the car document form in the wizard when the car informations form is available
  get isNextWizard():boolean{
    if(this.carSaveForm.valid===true) return false;
    return true;
  }

  get isDriver():boolean{
    if(this.driverSaveForm.valid===true) return false;
    return true;
  }

  //save a new car in the bd

  saveCarHandle(): void{
    this.saveVehicule();
    this.closeModal();
  }


  // close all the modal
  closeModal(): void{
   if(this.openCarSave === true){
      this.openCarSave = false;
      this.carSaveForm.reset();
    }

    if(this.openSaveClientModal === true){
      this.openSaveClientModal = false;
      this.clientSaveForm.reset();
      this.entrepriseForm.reset();
      this.personClientForm.reset();
    }

   if(this.openTrajetModal=== true){
    this.openTrajetModal= false;
    this.pathSaveForm.reset();
   }

   if(this.saveProductOpen === true){
     this.saveProductOpen= false;
     this.productSaveForm.reset();
    }

   if(this.saveMotifOpen   === true){
     this.saveMotifOpen  = false;
     this.motifSaveForm.reset();
    }

   if(this.openDriverSave   === true){
      this.openDriverSave = false;
      this.driverSaveForm.reset();
    }

  }

  //open the wizard to add a new car
  openModal(): void{
    this.openCarSave = true;
  }

  //open the product modal form to add a new product
  openProductModal(): void{
    this.saveProductOpen = true;
  }

  //open the  reason modal form to add a new trip reason
  openReasonModal(): void{
    this.saveMotifOpen = true;
  }

  openPathModal(): void{
    this.openTrajetModal = true;
  }

  openDriverModal(): void{
    this.openDriverSave = true;
  }

  openClientModal(): void{
    this.openSaveClientModal = true;
  }

  //add a new path
  onAddPath(): void{

    this.newpath.libelle = this.pathSaveForm.get("typeTrajet").value;

    this.newpath.villeA  =  new Object('61dc399a1a704c623a6a9c47');
    this.newpath.villeD  = new Object('61dc399a1a704c623a6a9c47');

    this.newpath.distance= 350

    console.log( this.newpath)
    this.trajetService.sendTrajet(this.newpath).subscribe(
      (resp)=>{

        this.emitPath();
      }
    )
    this.openTrajetModal = false;
  }
  emitPath() {
    this.trajetService.getDataFromServer().subscribe(
      (resp)=>{
          this.listeTrajet = resp;

      }
    ) }

  //add a new driver
  onAddDriver(): void{
    this.newdriver.nom            = this.driverSaveForm.get("nomDriver").value;
    this.newdriver.prenom         = this.driverSaveForm.get("prenomDriver").value;
    this.newdriver.password       = this.driverSaveForm.get("nomDriver").value;
    this.newdriver.telephone      = '66 08 34 56'
    this.newdriver.photo          = this.driverSaveForm.get("photoDriver").value;
    this.newdriver.adresse        = this.driverSaveForm.get("adresseDriver").value;
    this.newdriver.disponibilite  = true;
    this.newdriver.permis         = this.driverSaveForm.get("permisDriver").value;
    this.newdriver.permisExp      = new Date(this.driverSaveForm.get("dateExperation").value);

    this.chauffeurService.sendChauffeur(this.newdriver).subscribe(
        (resp)=>{
          this.emitDriver();
        }
    )

   this.openCarSave = false;

  }
  emitDriver(){
    this.chauffeurService.getDataFromServer().subscribe(
      (resp)=>{
        this.listeChauffeur = resp;
      }
    )
  }

  /*----------------------------*/
  //only make the new product  saving button available when this form is available
  get isProduit():boolean{
    if(this.productSaveForm.valid === true) return false;
    return true;
  }

  //only make the new trip reason saving button available when this form is available
  get isMotif():boolean{
    if(this.motifSaveForm.valid === true) return false;
    return true;
  }

  get isPath():boolean{
    if(this.pathSaveForm.valid === true) return false;
    return true;
  }

  get isClient():boolean{
    const client     =this.clientSaveForm.valid;
    const person     =this.personClientForm.valid;
    const entreprise = this.entrepriseForm.valid;
    if((this.personneImage===true)&&(client===true)&&(person===true)) return false;
    if((this.entrepriseImage===true)&&(client===true)&&(entreprise===true)) return false;
    return true;
  }

  //add the new product in the db
  onAddProduit(): void{
    this.newProduct.designation = this.productSaveForm.get("intitule").value;
    this.newProduct.unite       = 'tube';

    this.produitService.sendProduit(this.newProduct).subscribe(
      (resp)=>{
      this.emitProduit()
      }
    );
    this.saveProductOpen      = false;
  }

  emitProduit() {
    this.produitService.getDataFromServer().subscribe(
      (resp:Produit[])=>{
        this.listeProduit = resp;
      }
    )
  }

  //add the new reason in the db
  onAddMotif(): void{

  }

/*--------------A faire images du wizard----------------------------*/
    personneImage:boolean   = false;
    entrepriseImage:boolean = false;


  ClickedPerson(): void{
      this.personneImage = true;
      this.entrepriseImage = false;
    }

  ClickedEntreprise(): void{
      this.entrepriseImage = true;
      this.personneImage = false;
    }
/**
 * Recuperation de toutes les villes
 */
  emitVille(){
    this.villeService.getCitiesAndCountries().subscribe(
      (dataRecup)=>{
        this.listeVille=dataRecup;
       // console.log(dataRecup) //test recuperation des données
      }
    );

  }


  ngOnDestroy(): void { }

}
