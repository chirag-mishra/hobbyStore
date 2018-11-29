import { Component,OnInit } from '@angular/core';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
import { Form } from '@angular/forms/src/directives/form_interface';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit {

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
  userID: any = "sanat@hobbyfare.com";
  cartLoad: boolean = true;
  noItem: boolean = true;
  showUpdateSpinner: boolean;
  updateItem: boolean;
  removeCartItem: boolean;
  savingAddress:boolean;
  isAddressBtnClicked:boolean;
  removeAddressLoader:boolean;
  disablePromobtn:boolean =false;
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

  constructor(private userdata: CartsharedService) {
   
    this.savingAddress=false;
    this.showUpdateSpinner = false;
    this.updateItem = false;
    this.removeCartItem = false;
    this.isAddressBtnClicked=false;
    this.removeAddressLoader=false;
  }


  ngOnInit() {
    this.loggedInUserID = commonWrapper.isLoggedIn();
    if (this.loggedInUserID != "" && this.loggedInUserID != undefined) {
      this.isLoggedIn = true;
      this.GetUserDetails();
    }
    else {
      this.isLoggedIn = false;
      this.userdetails.cart = localStorageWrapper.getCart();
      if (this.userdetails.cart != null) {
        if (this.userdetails.cart.length == 0) { this.noItem = true; }
        else {
          this.calculateTotal();
          this.noItem = false;
        }
        this.isLoggedIn = false;
        this.cartLoad = false;
      }
    }
  }

  GetUserDetails = () => {
    let parent = this;
    commonWrapper.getUserDetails(this.userID, function (userdetails) {
      parent.userdetails = userdetails;
      if (parent.userdetails != undefined && parent.userdetails != null) {
        if (parent.userdetails.cart.length == 0) {
          parent.noItem = true;
        }
        else {
          parent.calculateTotal();
          parent.noItem = false;
        }
      }
      else { parent.noItem = true; }
      parent.cartLoad = false;
    });
  }

  getDiscountValue(price: number, discount: number) {
    return (price - ((discount / 100) * price));
  }
  decreaseQty(index: number) {
    let parent = this;
    let userObject;
    parent.removeAddressLoader=false;
    parent.savingAddress=false;
    parent.showUpdateSpinner = true;
    parent.removeCartItem = false;
    parent.updateItem = true;
    if (this.loggedInUserID != "" && this.loggedInUserID != null) {
      userObject = { "emailId": this.loggedInUserID, "product": { "productId": this.userdetails.cart[index].productId, "quantity": -1 } };
      commonWrapper.updateCart(userObject, function (success) {
        commonWrapper.getUserDetails(parent.userID, function (userdetails) {
          parent.userdetails = userdetails;
          parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(parent.userdetails.cart));

          if (parent.userdetails.cart.length != 0) {
            parent.calculateTotal();
          }
          else {
            parent.noItem = true;
          }

          parent.showUpdateSpinner = false;
          parent.updateItem = false;
        });
      });
    }
    else {
      localStorageWrapper.decreaseQuantity(this.userdetails.cart[index].productId);
      this.userdetails.cart = localStorageWrapper.getCart();

      this.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(this.userdetails.cart));
      if (this.userdetails.cart.length != 0) {
        this.calculateTotal();
      }
      else { this.noItem = true; }
      parent.showUpdateSpinner = false;
      parent.updateItem = false;
    }
  }
  increaseQty(index: number) {
    let parent = this;
    let userObject;
    parent.savingAddress=false;
    parent.removeAddressLoader=false;
    parent.showUpdateSpinner = true;
    parent.removeCartItem = false;
    parent.updateItem = true;
    if (this.loggedInUserID != "" && this.loggedInUserID != null) {
      userObject = { "emailId": this.loggedInUserID, "product": { "productId": this.userdetails.cart[index].productId, "quantity": 1 } };
      commonWrapper.updateCart(userObject, function (success) {
        commonWrapper.getUserDetails(parent.userID, function (userdetails) {
          parent.userdetails = userdetails;

          parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(parent.userdetails.cart));
          if (parent.userdetails.cart.length != 0) {
            parent.calculateTotal();
          }
          else { parent.noItem = true; }

          parent.showUpdateSpinner = false;
          parent.updateItem = false;
        });
      });
    }
    else {
      localStorageWrapper.increaseQuantity(this.userdetails.cart[index].productId);
      this.userdetails.cart = localStorageWrapper.getCart();

      this.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(this.userdetails.cart));
      if (this.userdetails.cart.length != 0) {
        this.calculateTotal();
      }
      else {
        this.noItem = true;
      }
      parent.showUpdateSpinner = false;
      parent.updateItem = false;
    }
  }
  removeItem(index: number) {
    // let prodquantity = this.userdetails.cart[index].quantity;
    // this.userdetails.cart.splice(index, 1);
    let parent = this;
    let userObject;
    parent.savingAddress=false;
    parent.removeAddressLoader=false;
    parent.showUpdateSpinner = true;
    parent.removeCartItem = true;
    parent.updateItem = false;
    if (this.loggedInUserID != "" && this.loggedInUserID != null) {
      userObject = { "emailId": this.loggedInUserID, "product": { "productId": this.userdetails.cart[index].productId, "quantity": -1 * this.userdetails.cart[index].quantity } };
      commonWrapper.updateCart(userObject, function (success) {
        commonWrapper.getUserDetails(parent.userID, function (userdetails) {
          parent.userdetails = userdetails;
          parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(parent.userdetails.cart));

          if (parent.userdetails.cart.length != 0) {
            parent.calculateTotal();
          }
          else { parent.noItem = true; }

          parent.showUpdateSpinner = false;
          parent.removeCartItem = false;
        });
      });
    }
    else {
      localStorageWrapper.removeItemFromCart(this.userdetails.cart[index].productId);
      this.userdetails.cart = localStorageWrapper.getCart();
      this.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(this.userdetails.cart));
      if (this.userdetails.cart.length != 0) {
        this.calculateTotal();
      }
      else { this.noItem = true; }

      parent.showUpdateSpinner = false;
      parent.removeCartItem = false;
    }
  }

  calculateTotal() {
    this.finalPrice = 0;
    if (this.userdetails != "" && this.userdetails != undefined) {
      if (this.userdetails.cart != "" && this.userdetails.cart != undefined) {
        for (var value of this.userdetails.cart) {
          var sellprice = value.stock == 0 ? 0 : this.getDiscountValue(value.price, value.discount);
          this.finalPrice += sellprice * parseInt(value.quantity);
        }
      }
    }
    this.unalterdPrice = this.finalPrice;
    //this.validatePromoCode(this.promocode);
  }
  validatePromoCode(promocode: any) {
    if(this.disablePromobtn == false)
    {
    if (promocode === "NEW20") {
      var discountpercent = 20;
      this.promocodeval = (discountpercent / 100) * this.unalterdPrice;
      this.invalidPromocode = false;
      //this.finalPrice = this.unalterdPrice;
      this.finalPrice -= this.promocodeval;
      this.disablePromobtn = true;
    }
    else {
      this.promocodeval = 0;
      this.invalidPromocode = true;
      this.finalPrice = this.unalterdPrice;
      this.disablePromobtn = true;
    }
  }
  }

  proceedToCheckout() {
    let validate = this.validateUserDetails();
    if (validate) {

    }
    else {
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
    if (this.indianStates != undefined) {
      for (let i = 0; i < this.indianStates.length - 1; i++) {
        if (this.indianStates[i].id.toLowerCase().indexOf(this.userdetails.addresses[index].state.toLowerCase()) > -1)
          return this.indianStates[i].value;
      }
    }
  }
  addNewAddress() {
    this.isAddressBtnClicked=true;
    this.savingAddress=true;
    this.removeAddressLoader=false;
    this.showUpdateSpinner = true;
    this.updateItem = false;
    this.removeCartItem = false;
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
            parent.showUpdateSpinner = false;
            parent.savingAddress=false;  
            parent.isAddressBtnClicked=false;         
          }
        })
    }
    else {
      commonWrapper.scrollToElement('billingsection');
      parent.showUpdateSpinner = false;
      parent.savingAddress=false;     
    }
  }
  modelChange(value: any, field: any) {
    let emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let pincodereg = /^[1-9][0-9]{5}$/;
    let phonereg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (this.isAddressBtnClicked) {
      switch (field) {
        case 'firstname':
          if (value.trim() == "" || value.trim() == null) {
            this.invalidelement = "firstname";
          }
          else {
            this.invalidelement = "";
            this.firstname=value.trim();
            this.validateUserDetails();
          }
          break;
          case'lastname':
          if (value.trim() == "" || value.trim() == null) {
            this.invalidelement = "lastname";
          }
          else{
            this.invalidelement = "";
            this.lastname=value.trim();
            this.validateUserDetails();
          }
          break;
          case 'email':
          if (!emailreg.test(String(value.trim()).toLowerCase())) {
            this.invalidelement = "email";
          }
          else
          {
            this.invalidelement = "";
            this.email=value.trim();
            this.validateUserDetails();
          }
          break;
          case 'title':
          if (value.trim() == "" || value.trim() == null) {
            this.invalidelement = "title";
          }
          else{
            this.invalidelement = "";
            this.addresstitle=value.trim();
            this.validateUserDetails();
          }
          break;
          case 'address':
          if (value.trim() == "" || value.trim() == null) {
            this.invalidelement = "address";
          }
          else{
            this.invalidelement = "";
            this.address=value.trim();
            this.validateUserDetails();
          }
          break;
          case 'contact':
          if (!phonereg.test(String(value.trim()).toLowerCase())) {
            this.invalidelement = "contact";
          }
          else{
            this.invalidelement = "";
            this.contact=value.trim();
            this.validateUserDetails();
          }
          break;
          case 'city':
          if (value.trim() == "" || value.trim() == null) {
            this.invalidelement = "city";
          }
          else
          {
            this.invalidelement = "";
            this.city=value.trim();
            this.validateUserDetails();
          }
          break;
          case 'state':
          if (value == "" || value == null) {
            this.invalidelement = "state";
          }
          else
          {
            this.invalidelement = "";
            this.state=this.indianStates[value].id;
            this.validateUserDetails();
          }
          break;
          case 'pincode':
          if (!pincodereg.test(String(value.trim()).toLowerCase())) {
            this.invalidelement = "pincode";
          }
          else
          {
            this.invalidelement = "";
            this.pincode=value.trim();
            this.validateUserDetails();
          }
          break;
        default:
        break;
      }
    }
  }
  removeAddress(i:any) {
    this.savingAddress=false;
    this.removeAddressLoader=true;
    this.showUpdateSpinner = true;
    this.removeCartItem = false;
    this.updateItem = false;
    let parent =this;
    let addressParams = {
      "emailId": "sanat@hobbyfare.com",
      "address": this.userdetails.addresses[i]
    }
    fetch(commonWrapper.apiRoot + '/removeAddress', {
      method: 'post',
      body: JSON.stringify(addressParams),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        parent.userdetails.addresses = parent.userdetails.addresses.filter(item=>item != parent.userdetails.addresses[i]);
        parent.showUpdateSpinner = false;
        parent.removeAddressLoader = false;
      })
  }
}