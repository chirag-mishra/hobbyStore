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
  display:boolean;
  toolbarInfo: any = {
    toolbarDetails: [
      {
        "id": 1,
        "title": "Cards",
        "toolbarName": "Cards"
      },
      {
        "id": 2,
        "title": "Beginner Cards",
        "toolbarName": "Beginner Cards"
      },
      {
        "id": 3,
        "title": "Intermmediate Cards",
        "toolbarName": "Intermmediate Cards"
      },
      {
        "id": 4,
        "title": "Premium Cards",
        "toolbarName": "Premium Cards"
      },
      {
        "id": 5,
        "title": "Royal Cards",
        "toolbarName": "Royal Cards"
      },
      {
        "id": 6,
        "title": "Tuple Cards",
        "toolbarName": "Tuple Cards"
      },
    ]
  };
  constructor(private data: CartsharedService) {
    this.display=false;
  }

  public url = 'http://7c492ffb.ngrok.io/partialTextSearch';
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
  // onMouseOver(event:any){
  //   document.getElementById("Category").classList.remove('display-none');
  // }
  // onMouseOut(event:any){
  //   document.getElementById("Category").classList.add('display-none');
  // }
  onMouseOver(event:any){
    if (!this.display) {
      document.getElementById("Category").classList.remove('display-none');
    }    
  }
  onMouseOut(event:any){
    if (!this.display) {
      document.getElementById("Category").classList.add('display-none');
    }    
  }
  onMouseClick(event:any){
    this.display=!this.display;
    if(this.display)
    {
      document.getElementById("Category").classList.remove('display-none');      
    }
  }
}