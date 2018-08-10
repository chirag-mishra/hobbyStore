import { Component } from '@angular/core';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  title: string = "Hobby Fare";
  categories: any[] = ["Premium Cards", "Close Up Magic", "Intermediate Tricks", "Beginner Tricks", "Street Magic", "Mentalism", "Stage Magic", "Accessories", "Books"];
  bestSellers: any[] = ["Huppin's", "Popjens", "Bicycle"];

  scrollToDiv = (id) => {
    document.querySelector('#' + id).scrollIntoView({
      behavior: 'smooth'
    });
  }

  public url = '//suggestqueries.google.com/complete/search';
  public params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };
  public query = '';

  handleResultSelected(result) {
    this.query = result;
    this.scrollToDiv("productsCatalogue");
  }
}