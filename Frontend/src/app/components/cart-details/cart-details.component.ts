import { Component } from '@angular/core';
import { transition } from '@angular/core/src/animation/dsl';
import { Form } from '@angular/forms/src/directives/form_interface';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent {

  login: boolean;
  discount: number;
  private isCheckOutBtn = false;
  private GuestBtn = true;

  constructor() {
    this.isLoggedIn();
    if (this.login) {
      this.isCheckOutBtn = true;
      this.GuestBtn = false;
    }
  }
  isLoggedIn() { this.login = true; }

  cartproductdetails: any = [
    {
      id: "1",
      imageurl: "assets/images/prod1.jpg",
      costprice: "350",
      markprice: "590",
      quantity: "1",
      title: "Bicycle Cards",
      variant: "Blue"
    },
    {
      id: "2",
      imageurl: "assets/images/prod1.jpg",
      costprice: "100",
      markprice: "200",
      quantity: "1",
      title: "Bicycle Cards",
      variant: "Blue"
    }
  ];
  getdiscountValue(costprice1: number, markprice1: number) {
    return this.discount = costprice1 / markprice1;
  }
  decreaseQty(quantityMod: number, index: number) {
    if (this.cartproductdetails[index].quantity == 0) {
      return this.cartproductdetails[index].quantity = 0;
    }
    else {
      return --this.cartproductdetails[index].quantity;
    }
  }
  increaseQty(quantityMod: number, index: number) {
    return ++this.cartproductdetails[index].quantity;
  }

  onSubmit()
  {
    var forms = document.getElementsByClassName('needs-validation');
  }
}