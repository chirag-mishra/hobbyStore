import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
import { Form } from '@angular/forms/src/directives/form_interface';

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
  promocode: string;
  unalterdPrice: number;
  promoApply: boolean;
  promoVal:string;

  constructor(private toastr: ToastrService, private cartdata: CartsharedService) {
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
      category: "Cards",
      imageurl: "assets/images/prod1.jpg",
      costprice: "350",
      displayprice: "350",
      markprice: "590",
      quantity: "6",
      title: "Bicycle Cards",
      variant: "Blue",
      availablestock: "5"
    },
    {
      productid: "2",
      category: "Cards",
      imageurl: "assets/images/prod1.jpg",
      costprice: "100",
      displayprice: "100",
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
      this.toastr.warning(this.cartproductdetails[index].title, 'Quantity reduced Successfully!', {
        timeOut: 1500
      });
      this.cartdata.changecartvalue(-1);
      this.CalculateTotal();
    }
  }
  increaseQty(index: number) {
    if (this.cartproductdetails[index].quantity > this.cartproductdetails[index].availablestock - 1) {
      this.cartproductdetails[index].quantity = this.cartproductdetails[index].availablestock;
      this.toastr.error(this.cartproductdetails[index].title, 'Maximum available quantity reached!', {
        timeOut: 1500
      });
    }
    else {
      this.cartproductdetails[index].quantity++;
      this.toastr.success(this.cartproductdetails[index].title, 'Quantity increased Successfully!',
        {
          timeOut: 1500
        });

      this.cartdata.changecartvalue(1);
      this.CalculateTotal();
    }
  }
  CalculateTotal() {
    this.finalPrice = 0;
    for (var value of this.cartproductdetails) {
      value.costprice = value.availablestock == 0 ? 0 : value.costprice;
      this.finalPrice += (parseInt(value.costprice) * parseInt(value.quantity));
    }
    this.unalterdPrice = this.finalPrice;
    this.ValidatePromoCode(this.promocode);
  }

  ValidatePromoCode(promo: string) {
    if (this.finalPrice != 0) {
      this.promocode = promo;
      if (this.promocode === "NEW50") {
        this.promocodeval = 50 / 100 * this.unalterdPrice;
        this.invalidPromocode = false;
        this.finalPrice = this.unalterdPrice;
        this.finalPrice -= this.promocodeval;
      }
      else {
        this.promocodeval = 0;
        this.invalidPromocode = true;
        this.finalPrice = this.unalterdPrice;
      }
    }
  }
  RemoveItem(index: number) {
    var prodquantity = this.cartproductdetails[index].quantity;
    this.cartproductdetails.splice(index, 1);
    this.cartdata.changecartvalue(-1 * prodquantity);
    this.CalculateTotal();
  }
  submituserdetails()
  {}
  validateuserdetails()
  {}
}