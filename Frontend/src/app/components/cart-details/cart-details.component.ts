import { Component } from '@angular/core';
import { transition } from '@angular/core/src/animation/dsl';
import { Form } from '@angular/forms/src/directives/form_interface';
import { parse } from 'url';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent {

  login: boolean;
  discount: number;
  isCheckOutBtn: boolean = false;
  GuestBtn: boolean = true;
  finalPrice: number = 0;
  promocodeval: number = 20;
  invalidPromocode: boolean;

  constructor() {
    this.isLoggedIn();
    if (this.login) {
      this.isCheckOutBtn = true;
      this.GuestBtn = false;
    }
    this.CalculateTotal();
  }
  isLoggedIn() { this.login = true; }

  cartproductdetails: any = [
    {
      productid: "1",
      imageurl: "assets/images/prod1.jpg",
      costprice: "350",
      markprice: "590",
      quantity: "1",
      title: "Bicycle Cards",
      variant: "Blue",
      availablestock: "5"
    },
    {
      productid: "2",
      imageurl: "assets/images/prod1.jpg",
      costprice: "100",
      markprice: "200",
      quantity: "1",
      title: "Bicycle Cards",
      variant: "Blue",
      availablestock: "0"
    }
  ];
  getdiscountValue(costprice: number, markprice1: number) {
    return this.discount = costprice / markprice1;
  }
  decreaseQty(index: number) {
    if (this.cartproductdetails[index].quantity == 0) {
      this.cartproductdetails[index].quantity = 0;
    }
    else {
      this.cartproductdetails[index].quantity--;
      this.CalculateTotal();
    }
  }
  increaseQty(index: number) {
    if (this.cartproductdetails[index].quantity > this.cartproductdetails[index].availablestock - 1) {
      this.cartproductdetails[index].quantity = this.cartproductdetails[index].availablestock;
    }
    else {
      this.cartproductdetails[index].quantity++;
      this.CalculateTotal();
    }
  }
  CalculateTotal() {
    this.finalPrice = 0;
    for (var value of this.cartproductdetails) {
      this.finalPrice += (parseInt(value.costprice) * parseInt(value.quantity));
    }
    this.ValidatePromoCode();
  }
  ValidatePromoCode() {
    if (false) { 
      // this.invalidPromocode = false; 
    }
    else {
    this.promocodeval = 0;
    this.invalidPromocode = true;
    }
    this.finalPrice -= this.promocodeval;
  }
}