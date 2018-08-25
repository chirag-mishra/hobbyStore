import { Component } from '@angular/core';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
import { Observable } from 'rxjs';
import { of as staticOf } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  title: string = "Hobby Fare";
  categories: any[] = ["Premium Cards", "Close Up Magic", "Intermediate Tricks", "Beginner Tricks", "Street Magic", "Mentalism", "Stage Magic", "Accessories", "Books"];
  bestSellers: any[] = ["Huppin's", "Popjens", "Bicycle"];
  cartvalue: number = 2;

  constructor(private data: CartsharedService) {
    
  }

  public url = 'http://085852fa.ngrok.io/partialTextSearch';
  public query = '';

  handleHttpResultSelected(result: any) {
    console.log(result);
    this.query = result;
  }
   
  ngOnInit() {
    this.data.currentvalue.subscribe(quantity => this.cartvalue += quantity);
  }

  scrollToDiv = (id) => {
    document.querySelector('#' + id).scrollIntoView({
      behavior: 'smooth'
    });
  }

}