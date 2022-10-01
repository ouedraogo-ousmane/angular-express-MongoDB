import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiviteChauffeurComponent } from './components/activite-chauffeur/activite-chauffeur.component';
import { AdminatrationPageComponent } from './components/adminatration-page/adminatration-page.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ClientComponent } from './components/clients/client.component';
import { CreationTrajetComponent } from './components/creation-trajet/creation-trajet.component';
import { CreationVilleComponent } from './components/creation-ville/creation-ville.component';
import { DepensesMaintenanceComponent } from './components/depenses-maintenance/depenses-maintenance.component';
import { DepensesMissionsComponent } from './components/depenses-missions/depenses-missions.component';

import { ExerciceDetailComponent } from './components/exercice-detail/exercice-detail.component';
import { GenererBilanVehiculeComponent } from './components/generer-bilan-vehicule/generer-bilan-vehicule.component';
import { InterfaceChauffeurComponent } from './components/interface-chauffeur/interface-chauffeur.component';
import { InventairePanneComponent } from './components/inventaire-panne/inventaire-panne.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { PieceEchangeeComponent } from './components/piece-echangee/piece-echangee.component';
import { RecettePesageComponent } from './components/recette-pesage/recette-pesage.component';
import { RecetteTransportComponent } from './components/recette-transport/recette-transport.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { RolesComponent } from './components/roles/roles.component';
import { VehiculesComponent } from './components/vehicules/vehicules.component';
import { ProgrammerVoyageComponent } from './programmer-voyage/programmer-voyage.component';
import { PiecesComponent } from './components/pieces/pieces.component';




const routes: Routes = [

  {path:'login',component:AuthentificationComponent},
  {path:'pesage',component:RecettePesageComponent},
  {path:'transport',component:RecetteTransportComponent},
  {path:'depense',component:PiecesComponent},
  {
    path:'depenses',component:PiecesComponent,

      children:[

        {path:'depenseMission',component:DepensesMissionsComponent},

        {path:'depenseMaintenance',component:DepensesMaintenanceComponent},
      ]
},


    //Taches d' exercices

  {
    path:'exercices',component: ListeExerciceComponent,

    children:[
      {path:'exercicedetail/:_id',component:ExerciceDetailComponent,
        
    },

      { path:'programmation/:_id',component:ProgrammerVoyageComponent},

      {path:'rentabiliteVehicule/:_id',component:GenererBilanVehiculeComponent},

      {path:'activiteChauffeur/:_id',component:ActiviteChauffeurComponent},

      {path:'inventairePanne/:_id',component:InventairePanneComponent},

      

      
    
      ]
  },
  {
    path:'recettes',component:RecettesComponent,

    children:[

      {path:'recettePesage',component:RecettePesageComponent},

      {path:'recetteTransport',component:RecetteTransportComponent},
    ]
  },

          //Taches d' administrations
  {
    path:'adminPage',component:AdminatrationPageComponent,

    children:[
      {path:'roles/:status',component:RolesComponent},

      {path:'updateVehicule',component:VehiculesComponent },

      {path:'updateChauffeur',component:InterfaceChauffeurComponent},

      {path:'updateVille',component:CreationVilleComponent},

      {path:'updatePays',component:InterfaceChauffeurComponent},

      {path:'client',component:ClientComponent },

      {path:'chauffeur/:_id',component:CreationTrajetComponent},

      {path:'produits',component:PieceEchangeeComponent},

      {path:'pieces',component:InterfaceChauffeurComponent},

      {path:'trajet',component:CreationTrajetComponent},
    ]
 },


  {path:'',component:AuthentificationComponent},

  {path:'**',component:AuthentificationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
