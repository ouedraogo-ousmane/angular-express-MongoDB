import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfosCoutRecette } from 'src/app/models/infos-cout-recette';
import { Produit } from 'src/app/models/produit';
import { administrationService } from 'src/app/services/administration.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-piece-echangee',
  templateUrl: './piece-echangee.component.html',
  styleUrls: ['./piece-echangee.component.css']
})
export class PieceEchangeeComponent implements OnInit, OnDestroy {

  responsable:any[]=[
    {name:'Klinker',unite:'tonne',coutUnitaire:'1000', dateCreation:'05/04/2022'},
    {name:'fer',unite:'tube',coutUnitaire:'1040', dateCreation:'03/05/2022'},
    {name:'tole back',unite:'lamme',coutUnitaire:'200', dateCreation:'09/07/2022'},
  ]

  productSaveForm: FormGroup   = new FormGroup({});
  openSaveProductModal:boolean = false;
  infosProduct:InfosCoutRecette= new InfosCoutRecette(null,null,null,null);
    newProduit:Produit        = new Produit(null,null,null);
    listeProduit:any[]     = [];
    listeInfo:InfosCoutRecette[] = [];

  constructor(
    private fb:FormBuilder,
    private produitService:ProduitService,
    private adminService:administrationService) { }



  ngOnInit(): void {
    this.productSaveForm = this.fb.group({
      _id:this.fb.control(null),
      idProduit:this.fb.control(null),
      idInfos:this.fb.control(null),
      dateEnVigueur:this.fb.control(''),
      intitule:this.fb.control('',Validators.required),
      unite:this.fb.control('',Validators.required),
      coutUnitaire:this.fb.control('',Validators.required)
    });

    this.emitProduct();
    this.adminService.isRefreshAdminPage();
  }

  closeModal(){
    this.openSaveProductModal = false;
    this.productSaveForm.reset();
  }

 get isProduct(){
    const intituleValid = this.productSaveForm.get('intitule').valid;
    const uniteValid    = this.productSaveForm.get('unite').valid;
    const coutValid     = this.productSaveForm.get('coutUnitaire').valid;

    if((intituleValid && uniteValid && coutValid) == true) return false;
    return true;

  }

onSaveInfoProduct(idProduit){
  this.infosProduct.coutUnitaire = this.productSaveForm.get('coutUnitaire').value;
  this.infosProduct.dateEnVigueur= new Date();
  this.infosProduct.idProduit    = idProduit;
  this.produitService.sendInfosProduit(this.infosProduct).subscribe(
    (data)=>{
      console.log("Données envoyées avec succès!!!");
      
    })
  //methode d'envoie de données
}

onSaveProduct(){
  this.newProduit.designation = this.productSaveForm.get('intitule').value;
  this.newProduit.unite       = this.productSaveForm.get('unite').value;
  this.newProduit._id = this.productSaveForm.get('_id').value;
  if(this.newProduit._id ===null){
    this.produitService.sendProduit(this.newProduit).subscribe(
      (data)=>{
        console.log("Données envoyées avec succès !!!");
       // console.log(data);
        this.onSaveInfoProduct(data._id);
        this.emitProduct();
        this.closeModal();
        //methode d'envoie de données  
  
      }
    );
  }else{
    this.produitService.updateProduit(this.newProduit).subscribe(
      (data)=>{
        console.log("Données modifiées avec succès !!!");
       // console.log(data);
        this.updateInfosProduit();
        this.emitProduct();
        this.closeModal();
        //methode d'envoie de données  
  
      }
    );
  }
  
}

/**
 * methode de modification des informations liées a un produit
 */
 updateInfosProduit(){
  this.infosProduct.coutUnitaire = this.productSaveForm.get('coutUnitaire').value;
  this.infosProduct.dateEnVigueur= this.productSaveForm.get('dateEnVigueur').value;
  this.infosProduct.idProduit    = this.productSaveForm.get('_id').value;
  this.infosProduct._id    = this.productSaveForm.get('idInfos').value;
  if(this.infosProduct._id !=null){
    this.produitService.updateInfosProduit(this.infosProduct).subscribe(
      (data)=>{
        alert("Données modifiées avec succès dans le document infos produit !!!");
       // console.log(data);
        //methode d'envoie de données  
        this.emitProduct();
  
      }
    );
  }
   
 }
emitProduct(){
  //recuperation des produits du serveur
  this.produitService.getDataTable().subscribe(
    (data)=>{
      this.listeProduit = data;
      
    }
  );
}

openAddProduct(){
  this.productSaveForm.reset();
  this.openSaveProductModal = true;
}

onEdit(produit:any){
  this.productSaveForm.get('intitule').setValue(produit.name);
  this.productSaveForm.get('unite').setValue(produit.unite);
  this.productSaveForm.get('coutUnitaire').setValue(produit.coutUnitaire);
  this.productSaveForm.get('dateEnVigueur').setValue(produit.dateEnVigueur);
  this.productSaveForm.get('idInfos').setValue(produit._id);
  this.productSaveForm.get('_id').setValue(produit.idProduit);
  this.openSaveProductModal = true;
}

onDelete(produit){
  this.produitService.deleteInfosProduit(produit._id).subscribe(
    (data)=>{
      this.produitService.deleteProduit(data.idProduit).subscribe(
        ()=>{
          this.emitProduct();
          alert("données supprimées avec succès");
          
        }
      )
      
    }
  );;
}

onDetailOpen($event){}

ngOnDestroy(): void { 
}

}
