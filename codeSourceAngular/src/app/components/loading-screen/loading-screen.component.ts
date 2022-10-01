import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingScreenService } from 'src/app/services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  loadingSubscription: Subscription;

  open:boolean = true;

  constructor(private loadingScreenService: LoadingScreenService) {

  }

  ngOnInit() {

        this.loadingScreenService.startLoading();

        this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
          (value)=> {
            alert(value)
          this.loading = value;
       });

       this.loading = true;
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
