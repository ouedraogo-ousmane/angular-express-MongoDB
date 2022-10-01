import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Entreprise } from 'src/app/models/entreprise';
import { Particulier } from 'src/app/models/particulier';
import { administrationService } from 'src/app/services/administration.service';
import { ClientsService } from 'src/app/services/clients.service';
import { TypeDepense } from '../../models/type-depense';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  responsable:any[]=[
    {name:'Ouedrqogo',lastName:'Ousmane',role:'personne' , dateCreation:'05/04/2022'},
    {name:'CIMAF', dateCreation:'05/04/2022',role:'Entreprise'},
    {name:'CITAB', dateCreation:'05/04/2022',role:'Entreprise'}
  ]

  /**
   * Les booleans
   */
  personneImage:boolean   = false;
  entrepriseImage:boolean = false;
  openParticulierModal:boolean = false;
  openEntrepriseModal: boolean = false;
  openSaveClientModal:boolean = false;

  tableData:any[]             =[];
  listeClient:Client[]        = [];
  newClient:Client            = new Client(null,null,null,null);
  personClient:Particulier    = new Particulier(null,null,null);
  entrepriseClient:Entreprise = new Entreprise(null,null,null,null,null);


  clientSaveForm:FormGroup   = new FormGroup({});
  entrepriseForm:FormGroup   = new FormGroup({});
  personClientForm:FormGroup = new FormGroup({});
  isClientTypeChoice: boolean= false;
  listeParticulier = [];
  listeEntreprise = [];
  clientEmitted: boolean =false;
  entrepriseEmitted: boolean =false;
  particulierEmitted: boolean =false;

  constructor(
    private fb:FormBuilder,
    private clientService:ClientsService,
    private adminService:administrationService) { }


  ngOnInit(): void {


        //save a new client form

        this.clientSaveForm = this.fb.group({
          nomClient:this.fb.control('',Validators.required),
          telClient:this.fb.control('',Validators.required),
          adresse: this.fb.control(''),
          idClient: this.fb.control('')
        });

        this.personClientForm = this.fb.group({
          prenomClient:this.fb.control('',Validators.required),
          idParticulier: this.fb.control('')
        })

        this.entrepriseForm = this.fb.group({
          ifuClient:this.fb.control('',Validators.required),
          logoClient:this.fb.control('',Validators.required),
          rccmclient: this.fb.control('',Validators.required),
          idEntreprise: this.fb.control('')
        });

        this.adminService.isRefreshAdminPage();
        this.emitClient();
        this.emitParticulier();
        this.emitEntreprise();
        //this.buildTable();
  }

  closeModal(){
    this.openSaveClientModal = false;
    this.openEntrepriseModal = false;
    this.openParticulierModal = false;
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
   // this.entrepriseClient.Client =  new Object('61dc399a1a704c623a6a9c47');

    this.clientService.sendClientEntreprise(this.entrepriseClient).subscribe(
      (data)=>{ 
        console.log(data);
         this.emit();
      }
    )
  }

  saveParticulier(){
    this.personClient.prenom   = this.personClientForm.get("prenomClient").value;
   // this.personClient.Client =  new Object('61dc399a1a704c623a6a9c47');
    this.clientService.sendClientParticulier(this.personClient).subscribe(
      (data)=>{
        console.log(data);
        this.emit();

      }
    )  
  }



  saveClient(){
    this.newClient.adresseClient = this.clientSaveForm.get("adresse").value;
    this.newClient.nomClient     = this.clientSaveForm.get("nomClient").value;
    this.newClient.telClient     = this.clientSaveForm.get("telClient").value;
    //this.newClient._id           = ;

    this.clientService.sendClient(this.newClient).subscribe(
     (data :any)=>{
       console.log("données enregistrees dans le document Client");
      // console.log(data);
       if(this.personneImage ===true){
         this.personClient.Client = data._id;
         this.saveParticulier();
         console.log("données enregistrees dans le document Particulier");
         this.closeModal();

       }
       else{
         this.entrepriseClient.Client = data._id;
         this.saveEntreprise();
         console.log("données enregistrees dans le document Entreprise");
         this.closeModal();


       }
      // this.emit();
     }
    )
  }

  /**
   * Les emitters
   */

  emit(){
    this.emitClient();
    this.emitEntreprise();
    this.emitParticulier();
  }

  emitParticulier(){
    this.clientService.getAllDataFromParticulier().subscribe(
      (resp:Particulier[])=>{
        this.listeParticulier = resp;
        this.particulierEmitted =true;
        console.log(this.listeParticulier);
        
      },
      (error)=>{},
      ()=>{},
    )
  }

  emitEntreprise(){
    this.clientService.getDataClientEntrepriseFromServer().subscribe(
      (resp:Entreprise[])=>{
        this.listeEntreprise = resp;
        this.entrepriseEmitted = true;
        for(let data of this.listeEntreprise){
          this.listeParticulier.push(data);
        }
        //console.log(this.listeEntreprise);
        
      },
      (error)=>{},
      ()=>{},
    )
  }

  emitClient() {
    this.clientService.getClients().subscribe(
      (resp:Client[])=>{
        this.listeClient = resp;
        this.clientEmitted = true;
        console.log(this.listeClient);
        
      },
      (error)=>{},
      ()=>{},
    )
  }

  buildTable(){

    if(this.clientEmitted && this.particulierEmitted && this.entrepriseClient){
       for(let i=0;i<this.listeClient.length;i++){
         for(let j=0;j<this.listeEntreprise.length;j++){
           if(this.listeClient[i]._id===this.listeEntreprise[j].Client){
             let data = {
               nom:this.listeClient[i].nomClient,
               adresse:this.listeClient[i].adresseClient,
               telephone:this.listeClient[i].telClient,
               ifu:this.listeEntreprise[j].ifu,
               logo:this.listeEntreprise[j].logo,
               rccm:this.listeEntreprise[j].rccm

               
             }
             this.tableData.push(data);
             j=this.listeEntreprise.length;

           }
           
         }
       }

       for(let i=0;i<this.listeClient.length;i++){
        for(let j=0;j<this.listeParticulier.length;j++){
          if(this.listeClient[i]._id===this.listeEntreprise[j].Client){
            let data = {
              nom:this.listeClient[i].nomClient,
              adresse:this.listeClient[i].adresseClient,
              telephone:this.listeClient[i].telClient,
              prenom:this.listeParticulier[j].prenom,
            }
            this.tableData.push(data);
             j=this.listeParticulier.length;
          }
        }
      }
    }
   // console.log(this.buildTable);

    
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
onEdit(responsable){
  this.clientSaveForm.get("adresse").setValue(responsable.adresseClient);
  this.clientSaveForm.get("nomClient").setValue(responsable.nomClient);
  this.clientSaveForm.get("telClient").setValue(responsable.telClient);
  this.clientSaveForm.get("idClient").setValue(responsable.idClient);
  if(responsable.type === "Personne"){
    
    this.personClientForm.get("prenomClient").setValue(responsable.prenom);
    this.personClientForm.get("idParticulier").setValue(responsable._id);
    this.openParticulierModal =true;
   
  }else{
    this.entrepriseForm.get("idEntreprise").setValue(responsable._id);
    this.entrepriseForm.get('ifuClient').setValue(responsable.ifu);
    //this.entrepriseForm.get('logoClient').value;
    this.entrepriseForm.get('rccmclient').setValue(responsable.rccm);
    this.openEntrepriseModal = true;
    

  }
}


onDetailOpen($event){}

updateClient(){
  this.newClient.adresseClient = this.clientSaveForm.get("adresse").value;
  this.newClient.nomClient     = this.clientSaveForm.get("nomClient").value;
  this.newClient.telClient     = this.clientSaveForm.get("telClient").value;
  this.newClient._id           = new Object(this.clientSaveForm.get("idClient").value);

  this.personClient.prenom     = this.personClientForm.get("prenomClient").value;
  this.personClient.Client     = new Object(this.clientSaveForm.get("idClient").value);
  this.personClient._id        = new Object(this.personClientForm.get("idParticulier").value);

  this.entrepriseClient.ifu    = this.entrepriseForm.get('ifuClient').value;
  this.entrepriseClient.logo   = this.entrepriseForm.get('logoClient').value;
  this.entrepriseClient.rccm   = this.entrepriseForm.get('rccmclient').value;
  this.entrepriseClient.Client = new Object(this.clientSaveForm.get("idClient").value);
  this.entrepriseClient._id    =  new Object(this.entrepriseForm.get('idEntreprise').value);

  

    this.clientService.updateClient(this.newClient).subscribe(
      (data)=>{
        console.log("données mis à jour ",data);
        this.emitClient();
      }
    );

    if(this.entrepriseClient._id !=null){
      this.clientService.updateClientEntreprise(this.entrepriseClient).subscribe(
        (data)=>{
          console.log("données mis à jour ",data);
          this.emit();
        }
      ); 
    }else if(this.personClient._id !=null){
      this.clientService.updateClientParticulier(this.personClient).subscribe(
        (data)=>{
          console.log("données mis à jour ",data);
          this.emit();
        }
      );
    }
    else{
      console.log("pas de mise à jour effectué");
      
    }

}


onDelete(client:any){

  this.clientService.deleteClient(client._id).subscribe(
    (data:any)=>{
      console.log("données supprimées avec succès ",data);
      this.emitEntreprise();
      
    }
  );

}

  onDeleteEntreprise(entreprise:any){

    this.clientService.deleteClientEntreprise(entreprise._id).subscribe(
      (data:any)=>{
        console.log("données supprimées avec succès ",data);
        this.emitEntreprise();
        
      }
    );

  }

  onDeleteParticulier(particulier:any){

    this.clientService.deleteClientParticulier(particulier._id).subscribe(
      (data:any)=>{
        console.log("données supprimées avec succès ",data);
        this.emitParticulier();
        
      }
    );

  }
ngOnDestroy(): void {

}

}
