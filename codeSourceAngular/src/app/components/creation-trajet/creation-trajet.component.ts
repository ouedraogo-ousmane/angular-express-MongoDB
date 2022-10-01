import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-creation-trajet',
  templateUrl: './creation-trajet.component.html',
  styleUrls: ['./creation-trajet.component.css']
})
export class CreationTrajetComponent implements OnInit {

  trajetForm:FormGroup;
  chauffeurForm: FormGroup;
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }


  ngOnInit(): void {

    this.trajetForm = this.fb.group({
      trajetInfos: this.fb.group({
        typeTrajet :this.fb.control('',[Validators.required]),
        villeDepart:this.fb.control('',[Validators.required]),
        villeArrivee:this.fb.control('',[Validators.required])
             
      })});

      
  } 

  

}
