import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private _loading: boolean = false;

  loadingStatus:Subject<any> = new Subject();

    lloading():boolean {
    return this._loading;
  }

   loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading(true);
  }

  stopLoading() {
    this.loading(false);
  }
}
