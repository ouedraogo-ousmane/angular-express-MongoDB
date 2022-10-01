import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponsableService } from '../../services/responsable.service';
import { Responsable } from 'src/app/models/responsable';
import { ListesExerciceService } from '../../services/listes-exercice.service';
import { Exercice } from 'src/app/models/exercice';
import { Router } from '@angular/router';



@Component({
  selector: 'app-programmation',
  templateUrl: './programmation.component.html',
  styleUrls: ['./programmation.component.css']
})
export class ProgrammationComponent implements OnInit {

@Input()  exercices : any[];
@Output() gotoExoEventEmitter = new EventEmitter()

responsables : Responsable[];

  constructor(
    private router : Router,
    private respService : ResponsableService
    ) { }

  ngOnInit(): void {}

  gotoExercice(exercice){
    this.gotoExoEventEmitter.emit(exercice);
  }


}
