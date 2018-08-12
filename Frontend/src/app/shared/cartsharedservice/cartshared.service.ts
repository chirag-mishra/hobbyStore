import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartsharedService {

  private cartvaluesource = new BehaviorSubject<number>(0);
  currentvalue = this.cartvaluesource.asObservable(); 

    constructor() { }

    changecartvalue(quantity:number)
    {
      this.cartvaluesource.next(quantity);
    }
}
