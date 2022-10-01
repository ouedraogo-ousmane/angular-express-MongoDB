 /***
       *
       * @--- logique de la page d'authentification
       *
       * * */
//importer pour clarity
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@cds/core/password/register.js';
import '@cds/core/icon/register.js';


import { airplaneIcon, ClarityIcons, cogIcon, flaskIcon, userIcon } from '@cds/core/icon';


import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LogInfo } from 'src/app/models/userLogin.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Account } from 'src/app/models/Account';
import { ResponsableService } from '../../services/responsable.service';
import { Responsable } from '../../models/responsable';

import { ListesExerciceService } from 'src/app/services/listes-exercice.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit,OnDestroy {

      // -- variables
  account: any[];
  loginSub :Subscription;

   usersForm = new FormGroup({});

  responsables : Responsable[];


  //
   subToUserInfo:Subscription;
   userOtherphne;
   userOther;
   usersLoginData:LogInfo = new LogInfo(null,null);

  cookieUserEmailOrPhone:string = '';
  cookieUserPassword:string = '';
  responsable: Responsable;
  loginData:User;

  constructor(
              private fb:FormBuilder,
              private httpService:HttpClient,
              private exerciceService : ListesExerciceService,
              private router:Router,
              private setCookieData:CookieService,
              private authentificationService : AuthentificationService,
              private respService :ResponsableService
              ) { }


  ngOnInit(): void {

    //this.emitData();

      //les icons clarity
    ClarityIcons.addIcons(userIcon,cogIcon,airplaneIcon,flaskIcon);

    //definition des controleurs d'authentification
    this.usersForm = this.fb.group({
         userLoginInfo: this.fb.group({
                'emailOrPhone': ["",
                Validators.compose([Validators.required,
                Validators.pattern(/^(\d{8}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
                password : this.fb.control('',[Validators.required, Validators.minLength(6)])
        })});

    //cookie

  }


//@setLoginCookie:  methode d'écriture des cookies pour les futures connexion d'un utilisateur
  setLoginCookie():void{

    if(!(this.setCookieData.check(this.cookieUserEmailOrPhone)
       && this.setCookieData.check(this.cookieUserPassword))){



      this.setCookiesInfos();

    }
    else{
      this.unsetCookies();
    }

  }

  setCookiesInfos():void{
    var isSaveCookie = window.confirm("Voulez activier les cookies!");
    if (isSaveCookie) {

      if( !(this.setCookieData.check(this.cookieUserEmailOrPhone)
          && this.setCookieData.check(this.cookieUserPassword))
        ){
          if(this.usersLoginData.userEmailOrPhone) {

            this.setConnexionCookies(this.usersLoginData);
          }
          else{} // les users Data sont vides n'active pas de cookies;
       }
    }
  }

   setConnexionCookies(userData:LogInfo):void{
      let expireDate = new Date();

      this.setCookieData.set(this.cookieUserEmailOrPhone,userData.userEmailOrPhone, expireDate.getDate()+10);


      this.setCookieData.set(this.cookieUserPassword,userData.userPassword,expireDate.getDate()+10);



   }

  unsetCookies():void{
    var isSaveCookie = window.confirm("Voulez desactivier les cookies!");
   if (isSaveCookie) {
    this.setCookieData.deleteAll();
   }
  }

  login(){

                          //récuperation des users data
        this.usersLoginData.userEmailOrPhone = this.usersForm.get('userLoginInfo').get('emailOrPhone').value;
        this.usersLoginData.userPassword     = this.usersForm.get('userLoginInfo').get('password').value;

        //const donnees:any =this.get();

        if( !(this.setCookieData.check(this.cookieUserEmailOrPhone)
                && this.setCookieData.check(this.cookieUserPassword))
        ){

          this.setLoginCookie();
        }

                 //récuperation des users data
    this.usersLoginData.userEmailOrPhone = this.usersForm.get('userLoginInfo').get('emailOrPhone').value;
    this.usersLoginData.userPassword     = this.usersForm.get('userLoginInfo').get('password').value;

    this.loginSub = this.authentificationService.authenticate(this.usersLoginData).subscribe(
      (value:any)=>{
        this.account = value;
        this.authentificationService.setToken(value.loginToken);
        this.authentificationService.setRoles(value.role);
        this.authentificationService.getLoginRoles(value.role).subscribe((roleValues:any)=>{

          this.authentificationService.setRoles(roleValues.nom);
          this.authentificationService.setRolesOperations(roleValues.operations);         
         // console.log(roleValues.operations);

        })
        
        //this.authentificationService.isLogged();
        this.gotoExercice();
       //console.log(value);
        
      },
      (error)=>{//en cas d'erreur
      },

      ()=>{// recuperation des données complete
      }
    );
    
  }

  //@setLoginCookie:  methode dde definition de la variable de session
  setSessionLogin():void{
  }

//@isValid(): desastive le button tant pas correcte
isValid():boolean{

  if(this.usersForm.get('userLoginInfo')?.invalid){

    return true;
  }
  return false
}


get isPasswordValid(){
    return this.usersForm.get('userLoginInfo').get('password');
}


get isEmailValid(){
  return this.usersForm.get('userLoginInfo').get('emailOrPhone');
}

//@passwordForget: oublie du password
passwordForget(){
}
//@accountChange(): changer infos sur son compte
accountChange(){}


//Accces à la page d'exercice
  gotoExercice(){
    this.router.navigate(['exercices']);
  }


  ngOnDestroy() {

    this.loginSub.unsubscribe();
  }
}