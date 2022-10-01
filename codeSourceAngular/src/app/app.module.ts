import { CommonModule, DatePipe } from '@angular/common';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ClarityModule } from '@clr/angular';


import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';


import { AppRoutingModule } from './app-routing.module';

import { MenuParcComponent } from './components/menu-parc/menu-parc.component';

import { ActiviteChauffeurComponent } from './components/activite-chauffeur/activite-chauffeur.component';

import { PhotoProfilComponent } from './components/photo-profil/photo-profil.component';

import { MenuLogistiqueComponent } from './components/menu-logistique/menu-logistique.component';

import { MenuGeneraleComponent } from './components/menu-generale/menu-generale.component';

import { EnregistrementResponsableComponent } from './components/enregistrement-responsable/enregistrement-responsable.component';
import { CreationTrajetComponent } from './components/creation-trajet/creation-trajet.component';
import { CreationVilleComponent } from './components/creation-ville/creation-ville.component';
import { CreationPaysComponent } from './components/creation-pays/creation-pays.component';
import { GenererBilanVehiculeComponent } from './components/generer-bilan-vehicule/generer-bilan-vehicule.component';

import { DepensesMissionsComponent } from './components/depenses-missions/depenses-missions.component';
import { DepensesMaintenanceComponent } from './components/depenses-maintenance/depenses-maintenance.component';
import { ExerciceDetailComponent } from './components/exercice-detail/exercice-detail.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { RecetteTransportComponent } from './components/recette-transport/recette-transport.component';
import { RecettePesageComponent } from './components/recette-pesage/recette-pesage.component';
import { VehiculesComponent } from './components/vehicules/vehicules.component';
import { MenuDepRecetteComponent } from './components/menu-dep-recette/menu-dep-recette.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { InterfaceChauffeurComponent } from './components/interface-chauffeur/interface-chauffeur.component';

import { RouterModule } from '@angular/router';

import { TableBilanComponent } from './components/table-bilan/table-bilan.component';
import { ProgrammerVoyageComponent } from './programmer-voyage/programmer-voyage.component';
import { ModalActionExoComponent } from './modal-action-exo/modal-action-exo.component';
import { AjouterExerciceAComponent } from './ajouter-exercice-a/ajouter-exercice-a.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CookieService } from 'ngx-cookie-service';
import { ProgrammationComponent } from './components/programmation/programmation.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { RolesComponent } from './components/roles/roles.component';
import { NoUserComponent } from './components/no-user/no-user.component';
import { PiecesComponent } from './components/pieces/pieces.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { InventairePanneComponent } from './components/inventaire-panne/inventaire-panne.component';
import { DepenseComponentComponent } from './components/depense-component/depense-component.component';
import { AdminatrationPageComponent } from './components/adminatration-page/adminatration-page.component';
import { ClientComponent } from './components/clients/client.component';
import { PieceEchangee } from './models/piece-echangee';
import { PieceEchangeeComponent } from './components/piece-echangee/piece-echangee.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuParcComponent,

    ActiviteChauffeurComponent,
    PhotoProfilComponent,
    MenuLogistiqueComponent,
    MenuGeneraleComponent,

    ProgrammationComponent,
    EnregistrementResponsableComponent,
    CreationTrajetComponent,
    CreationVilleComponent,
    CreationPaysComponent,

    GenererBilanVehiculeComponent,
    TableBilanComponent,
    DepensesMissionsComponent,
    DepensesMaintenanceComponent,
    ExerciceDetailComponent,
    ListeExerciceComponent,

    RecetteTransportComponent,
    RecettePesageComponent,
    VehiculesComponent,

    MenuDepRecetteComponent,
    AuthentificationComponent,
    InterfaceChauffeurComponent,
    ProgrammerVoyageComponent,

    ModalActionExoComponent,
    AjouterExerciceAComponent,
    LoadingScreenComponent,
    AdministrationComponent,
    RolesComponent,
    NoUserComponent,
    PiecesComponent,
    RecettesComponent,
    InventairePanneComponent,
    DepenseComponentComponent,
    AdminatrationPageComponent,
    ClientComponent,
    PieceEchangeeComponent


  ],

  imports: [
    CommonModule,

    BrowserModule,

    BrowserAnimationsModule,

    ClarityModule,

    AppRoutingModule,

    ReactiveFormsModule,

    HttpClientModule,

    RouterModule,

    

     ],

    schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [{provide: LOCALE_ID, useValue: "fr-FR"},CookieService,DatePipe],

  bootstrap: [AppComponent]
})
export class AppModule { }








