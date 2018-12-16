import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {

  private categorySource = new BehaviorSubject<string>("allitems");
  currentvalue = this.categorySource.asObservable(); 

    constructor() { }

    ChangeCatgeory(message:string)
    {
      this.categorySource.next(message);
    }
}
