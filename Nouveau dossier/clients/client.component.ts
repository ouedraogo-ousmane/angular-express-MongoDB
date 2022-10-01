import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Entreprise } from 'src/app/models/entreprise';
import { Particulier } from 'src/app/models/particulier';
import { administrationService } from 'src/app/services/administration.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  responsable:any[]=[
    {name:'Ouedrqogo',lastName:'Ousmane', dateCreation:'05/04/2022',role:'personne'},
    {name:'CIMAF', dateCreation:'05/04/2022',role:'Entreprise'},
    {name:'CITAB', dateCreation:'05/04/2022',role:'Entreprise'}
  ]

  personneImage:boolean   = false;
  entrepriseImage:boolean = false;
  listeClient:Client[]       = [];
  openSaveClientModal:boolean = false;
  newClient:Client            = new Client(null,null,null,null);
  personClient:Particulier    = new Particulier(null,null,null);
  entrepriseClient:Entreprise = new Entreprise(null,null,null,null,null);


  clientSaveForm:FormGroup   = new FormGroup({});
  entrepriseForm:FormGroup   = new FormGroup({});
  personClientForm:FormGroup = new FormGroup({});
  isClientTypeChoice: boolean= false;

  constructor(
    private fb:FormBuilder,
    private clientService:ClientsService,
    private adminService:administrationService) { }


  ngOnInit(): void {


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

        this.adminService.isRefreshAdminPage();
  }

  closeModal(){
    this.openSaveClientModal = false;
    this.clientSaveForm.reset();
    this.entrepriseForm.reset();
    this.personClientForm.reset();
  }

  get isClient():boolean{
    const client     =this.clientSaveForm.valid;
    const person     =this.personClientForm.valid;
    const entreprise = this.entrepriseForm.valid;
    if((this.personneImage===true)&&(client===true)&&(person===true)) return false;
    if((this.entrepriseImage===true)&&(client===true)&&(entreprise===true)) return false;
    return true;
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
  openAddClient(){
    this.openSaveClientModal = true;
  }

  ClickedPerson(): void{
    this.personneImage = true;
    this.entrepriseImage = false;
    this.isClientTypeChoice = true;
  }

ClickedEntreprise(): void{
    this.entrepriseImage = true;
    this.personneImage = false;
    this.isClientTypeChoice = true;
  }
onEdit(responsable){}

onDelete(responsable){}

onDetailOpen($event){}

ngOnDestroy(): void {

}

}
