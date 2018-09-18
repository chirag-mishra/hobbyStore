import { Component } from '@angular/core';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
import { Form } from '@angular/forms/src/directives/form_interface';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent {

  isLoggedIn: boolean;
  loggedInUserID: string;
  finalPrice: number = 0;
  promocodeval: number = 0;
  invalidPromocode: boolean;
  unalterdPrice: number;
  promoApply: boolean;
  promoVal: string;
  invalidelement: string = "";
  firstname: string = ""; lastname: string = ""; email: string = ""; addresstitle: string = "";
  contact: number; address: string = ""; landmark: string = ""; city: string = "";
  state: string = ""; pincode: string = "";
  selectedIndex: number;
  userdetails: any = [];
  userID: any = { "emailId": "sanat@hobbyfare.com" };

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

  }

  ngOnInit() {
    this.loggedInUserID = commonWrapper.isLoggedIn();
    if (this.loggedInUserID != "" && this.loggedInUserID != null) {
      this.isLoggedIn = true;
      this.loggedInUser();
    }
    else {
      this.userdetails.cart = localStorageWrapper.getCart();
      this.calculateTotal();
      this.isLoggedIn = false;
    }
  }
  dummyValues() {
    {
      this.userdetails = {
        "_id": "5b8d325c355e53554ba9d6c5",
        "emailId": "sant@hobbyfare.com",
        "name": "Sanat Samantray",
        "imageUrl": "url",
        "addresses": [
          {
            "title": "home",
            "firstname": "Sanat",
            "lastname": "Samantray",
            "email": "anonymous@gmail.com",
            "contact": 9581248172,
            "address": "406, sun valley apartment",
            "landmark": "near maharshi vidya mandir school",
            "city": "hyderabad",
            "state": "TG",
            "pincode": 500084
          },
          {
            "title": "work",
            "firstname": "Chirag",
            "lastname": "Mishra",
            "email": "anonymous@gmail.com",
            "contact": 9581248172,
            "address": "406, sun valley apartment",
            "landmark": "near maharshi vidya mandir school",
            "city": "hyderabad",
            "state": "OR",
            "pincode": 500084
          }
        ],
        "cart": [
          {
            "productIds": 1,
            "category": ["Beginner", "Intermediate"],
            "genre": "card",
            "imgUrls": ["assets/images/prod1.jpg", "assets/images/prod2.jpg"],
            "price": 200,
            "discount": 10,
            "quantity": 6,
            "title": "Bicycle Cards",
            "variant": "Blue",
            "stock": 5
          },
          {
            "_id": 2,
            "category": ["Beginner", "Intermediate"],
            "genre": "card",
            "imgUrls": ["assets/images/prod1.jpg", "assets/images/prod2.jpg"],
            "price": 300,
            "discount": 51.99,
            "quantity": 1,
            "title": "Bicycle Cards",
            "variant": "Blue",
            "stock": 0
          }
        ]
      }
    }
    this.calculateTotal();
  }

  loggedInUser = () => {
    let parent = this;
    //this.dummyValues();
    fetch(commonWrapper.apiRoot + '/getUserById', {
      method: 'post',
      body: JSON.stringify(parent.userID),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        parent.userdetails = data;
        parent.calculateTotal();
      });
  }

  getDiscountValue(price: number, discount: number) {
    return (price - ((discount / 100) * price));
  }
  decreaseQty(index: number) {
    if (this.userdetails.cart[index].quantity == 0) {
      this.userdetails.cart[index].quantity = 0;
    }
    else {
      this.userdetails.cart[index].quantity--;
      localStorageWrapper.decreaseQuantity(this.userdetails.cart[index].productId);
      this.cartdata.changecartvalue(-1);
      this.calculateTotal();
    }
  }
  increaseQty(index: number) {
    if (this.userdetails.cart[index].quantity > this.userdetails.cart[index].stock - 1) {
      this.userdetails.cart[index].quantity = this.userdetails.cart[index].stock;
    }
    else {
      this.userdetails.cart[index].quantity++;
      localStorageWrapper.increaseQuantity(this.userdetails.cart[index].productId);
      this.cartdata.changecartvalue(1);
      this.calculateTotal();
    }
  }
  calculateTotal() {
    this.finalPrice = 0;
    for (var value of this.userdetails.cart) {
      var sellprice = value.stock == 0 ? 0 : this.getDiscountValue(value.price, value.discount);
      this.finalPrice += sellprice * parseInt(value.quantity);
    }
    this.unalterdPrice = this.finalPrice;
    //this.validatePromoCode(this.promocode);
  }
  validatePromoCode(promocode: any) {
    if (promocode === "NEW20") {
      var discountpercent = 20;
      this.promocodeval = (discountpercent / 100) * this.unalterdPrice;
      this.invalidPromocode = false;
      //this.finalPrice = this.unalterdPrice;
      this.finalPrice -= this.promocodeval;
    }
    else {
      this.promocodeval = 0;
      this.invalidPromocode = true;
      this.finalPrice = this.unalterdPrice;
    }
  }

  removeItem(index: number) {
    let prodquantity = this.userdetails.cart[index].quantity;
    this.userdetails.cart.splice(index, 1);
    this.cartdata.changecartvalue(-1 * prodquantity);
    localStorageWrapper.removeItemFromCart();
    this.calculateTotal();
  }
  proceedToCheckout() {
    let validate = this.validateUserDetails();
    if (validate) {
      
    }
    else{
      commonWrapper.scrollToElement('billingsection');
    }
  }
  validateUserDetails() {
    var emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var pincodereg = /^[1-9][0-9]{5}$/;
    var phonereg = /^[6-9]\d{9}$/;

    if (this.firstname == "" || this.firstname == null) {
      this.invalidelement = "firstname";
      return false;
    }
    if (this.lastname == "" || this.lastname == null) {
      this.invalidelement = "lastname";
      return false;
    }
    if (!emailreg.test(String(this.email).toLowerCase())) {
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
    return this.userdetails.cart[index].quantity <= this.userdetails.cart[index].stock ? true : false;
  }
  selectBillingAddress(index: number) {
    this.selectedIndex = index;
    this.firstname = this.userdetails.addresses[index].firstname;
    this.lastname = this.userdetails.addresses[index].lastname;
    this.email = this.userdetails.addresses[index].email;
    this.addresstitle = this.userdetails.addresses[index].title;
    this.contact = this.userdetails.addresses[index].contact;
    this.address = this.userdetails.addresses[index].address;
    this.landmark = this.userdetails.addresses[index].landmark;
    this.city = this.userdetails.addresses[index].city;
    this.state = this.userdetails.addresses[index].state;
    this.pincode = this.userdetails.addresses[index].pincode;
  }
  stateName(index: number) {

    for (let i = 0; i < this.indianStates.length; i++) {
      if (this.indianStates[i].id.toLowerCase().indexOf(this.userdetails.addresses[index].state.toLowerCase()) > -1)
        return this.indianStates[i].value;

    }
  }
  addNewAddress() {
    let parent = this;
    let validate = this.validateUserDetails();
    if (validate) {
      let addressParams = {
        "emailId": "sanat@hobbyfare.com",
        "address": {
          "title": this.addresstitle,
          "firstname": this.firstname,
          "lastname": this.lastname,
          "email": this.email,
          "contact": this.contact,
          "address": this.address,
          "landmark": this.landmark,
          "city": this.city,
          "state": this.state,
          "pincode": this.pincode
        }
      }
      fetch(commonWrapper.apiRoot + '/saveAddress', {
        method: 'post',
        body: JSON.stringify(addressParams),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          if (response.ok) {
            parent.userdetails.addresses.push(addressParams.address);
            parent.selectedIndex = parent.userdetails.addresses.length - 1;
          }
        })
    }
    else {
      commonWrapper.scrollToElement('billingsection');
    }
  }
}