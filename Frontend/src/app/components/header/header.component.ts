import { Component } from '@angular/core';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';

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

  constructor(private data: CartsharedService) { }

  ngOnInit() {
    this.data.currentvalue.subscribe(quantity => this.cartvalue += quantity);
  }

  scrollToDiv = (id) => {
    document.querySelector('#' + id).scrollIntoView({
      behavior: 'smooth'
    });
  }

}