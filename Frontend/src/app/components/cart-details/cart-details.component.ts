import { Component } from '@angular/core';
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
  promoVal: string;
  invalidelement: string = "";
  addresstitle: string = ""; contact: number; address: string = "";
  landmark: string = ""; city: string = ""; state: string = ""; pincode: string = "";
  selectedIndex: number;


  indianStates: any = [{ id: 'AR', value: 'Arunachal Pradesh' },
  { id: 'AS', value: 'Assam' },
  { id: 'BR', value: 'Bihar' },
  { id: 'CT', value: 'Chhattisgarh' },
  { id: 'GA', value: 'Goa' },
  { id: 'GJ', value: 'Gujarat' },
  { id: 'HR', value: 'Haryana' },
  { id: 'HP', value: 'Himachal Pradesh' },
  { id: 'JK', value: 'Jammu and Kashmir' },
  { id: 'JH', value: 'Jharkhand' },
  { id: 'KA', value: 'Karnataka' },
  { id: 'KL', value: 'Kerala' },
  { id: 'MP', value: 'Madhya Pradesh' },
  { id: 'MH', value: 'Maharashtra' },
  { id: 'MN', value: 'Manipur' },
  { id: 'ML', value: 'Meghalaya' },
  { id: 'MZ', value: 'Mizoram' },
  { id: 'NL', value: 'Nagaland' },
  { id: 'OR', value: 'Odisha' },
  { id: 'PB', value: 'Punjab' },
  { id: 'RJ', value: 'Rajasthan' },
  { id: 'SK', value: 'Sikkim' },
  { id: 'TN', value: 'Tamil Nadu' },
  { id: 'TG', value: 'Telangana' },
  { id: 'TR', value: 'Tripura' },
  { id: 'UP', value: 'Uttar Pradesh' },
  { id: 'UT', value: 'Uttarakhand' },
  { id: 'WB', value: 'West Bengal' },
  { id: 'AN', value: 'Andaman and Nicobar Islands' },
  { id: 'CH', value: 'Chandigarh' },
  { id: 'DN', value: 'Dadra and Nagar Haveli' },
  { id: 'DD', value: 'Daman and Diu' },
  { id: 'LD', value: 'Lakshadweep' },
  { id: 'DL', value: 'Delhi' },
  { id: 'PY', value: 'Puducherry' }];

  constructor(private cartdata: CartsharedService) {
    this.isLoggedIn();
    if (this.login) {
      this.isCheckOutBtn = true;
      this.GuestBtn = false;
    }
    this.CalculateTotal();
  }

  isLoggedIn() { this.login = true; }
  userdetails: any =
    {
      userid: 1234,
      firstname: "anonymous",
      lastname: "anonymous",
      email: "anonymous@gmail.com",
      addresses: [
        {
          "title": "home",
          "name": "abhiram",
          "contact": 9581248172,
          "address": "406, sun valley apartment",
          "landmark": "near maharshi vidya mandir school",
          "city": "hyderabad",
          "state": "TG",
          "pincode": 500084
        },
        {
          "title": "work",
          "name": "abhiram",
          "contact": 9581248172,
          "address": "406, sun valley apartment",
          "landmark": "near maharshi vidya mandir school",
          "city": "hyderabad",
          "state": "OR",
          "pincode": 500084
        }
      ]
    }


  cartproductdetails: any = [
    {
      productid: 1,
      category: "Cards",
      imageurl: "assets/images/prod1.jpg",
      costprice: 350,
      displayprice: 350,
      markprice: 590,
      quantity: 6,
      title: "Bicycle Cards",
      variant: "Blue",
      availablestock: 5
    },
    {
      productid: 2,
      category: "Cards",
      imageurl: "assets/images/prod1.jpg",
      costprice: 100,
      displayprice: 100,
      markprice: 200,
      quantity: 1,
      title: "Bicycle Cards",
      variant: "Blue",
      availablestock: 0
    }
  ];
  getdiscountValue(costprice: number, markprice: number) {
    return this.discount = (markprice - costprice) / markprice;
  }
  decreaseQty(index: number) {
    if (this.cartproductdetails[index].quantity == 0) {
      this.cartproductdetails[index].quantity = 0;
    }
    else {
      this.cartproductdetails[index].quantity--;
      this.cartdata.changecartvalue(-1);
      this.CalculateTotal();
    }
  }
  increaseQty(index: number) {
    if (this.cartproductdetails[index].quantity > this.cartproductdetails[index].availablestock - 1) {
      this.cartproductdetails[index].quantity = this.cartproductdetails[index].availablestock;
    }
    else {
      this.cartproductdetails[index].quantity++;
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
      if (this.promocode === "NEW20") {
        var discountpercent = 20;
        this.promocodeval = discountpercent / 100 * this.unalterdPrice;
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
  submituserdetails() {
    var validate = this.validateuserdetails();
    if (!validate) {
      commonWrapper.test();
      commonWrapper.scrollToElement('billingsection');
    }
  }
  validateuserdetails() {
    var emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var pincodereg = /^[1-9][0-9]{5}$/;
    var phonereg = /^[6-9]\d{9}$/;

    if (this.userdetails.firstname == "" || this.userdetails.firstname == null) {
      this.invalidelement = "firstname";
      return false;
    }
    if (this.userdetails.lastname == "" || this.userdetails.lastname == null) {
      this.invalidelement = "lastname";
      return false;
    }
    if (!emailreg.test(String(this.userdetails.email).toLowerCase())) {
      this.invalidelement = "email";
      return false;
    }
    if (this.addresstitle == "" || this.addresstitle == null) {
      this.invalidelement = "title";
      return false;
    }
    if (this.address == "" || this.address == null) {
      this.invalidelement = "address";
      return false;
    }
    if (!phonereg.test(String(this.contact).toLowerCase())) {
      this.invalidelement = "contact";
      return false;
    }
    if (this.city == "" || this.city == null) {
      this.invalidelement = "city";
      return false;
    }
    if (this.state == "" || this.state == null) {
      this.invalidelement = "state";
      return false;
    }

    if (!pincodereg.test(String(this.pincode).toLowerCase())) {
      this.invalidelement = "pincode";
      return false;
    }

    this.invalidelement = "";
    return true;
  }
  availabilityCheck(index: number) {
    return this.cartproductdetails[index].quantity <= this.cartproductdetails[index].availablestock ? true : false;
  }
  selectBillingAddress(index: number) {
    this.selectedIndex = index;
    this.addresstitle = this.userdetails.addresses[index].title;
    this.contact = this.userdetails.addresses[index].contact;
    this.address = this.userdetails.addresses[index].address;
    this.landmark = this.userdetails.addresses[index].landmark;
    this.city = this.userdetails.addresses[index].city;
    this.state = this.userdetails.addresses[index].state;
    this.pincode = this.userdetails.addresses[index].pincode;
    this.selectedIndex = index;
  }
  stateName(index: number) {

    for (let i = 0; i < this.indianStates.length; i++) {
      if (this.indianStates[i].id.toLowerCase().indexOf(this.userdetails.addresses[index].state.toLowerCase()) > -1)
        return this.indianStates[i].value;

    }
  }
}