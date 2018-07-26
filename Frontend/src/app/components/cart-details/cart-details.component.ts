import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent {
  price: number = 350;
  actualPrice: number = 590;
  discount: number = this.price/this.actualPrice;
}