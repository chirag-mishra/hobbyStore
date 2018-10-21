import { Component, AfterViewInit } from '@angular/core';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements AfterViewInit {

  title: string = "Hobby Fare";
  categories: any[] = ["Premium Cards", "Close Up Magic", "Intermediate Tricks", "Beginner Tricks", "Street Magic", "Mentalism", "Stage Magic", "Accessories", "Books"];
  bestSellers: any[] = ["Huppin's", "Popjens", "Bicycle"];
  cartvalue: number = 0;
  display: boolean;
  asyncSelected: any;
  params: any;
  api: any;
  userdetails: any;

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
  loginDetails: any = {};
  signInModalHide: boolean;
  mouseOverOut: boolean;
  constructor(private userdata: CartsharedService) {
    this.display = false;
    this.mouseOverOut = false;
    let loggedUserId = commonWrapper.isLoggedIn();
    let parent = this;

    if (loggedUserId != "" && loggedUserId != undefined) {
      commonWrapper.getUserDetails(loggedUserId, function (userdetails) {
        parent.userdetails = userdetails;
        if (parent.userdetails != null && parent.userdetails != undefined) {
 
            parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(parent.userdetails.cart));
          
        }
      });
    }

  }

  ngOnInit() {
    this.userdata.currentvalue.subscribe(quantity => this.cartvalue = quantity);
  }
  public url = commonWrapper.apiRoot + '/partialTextSearch';
  public query = '';

  handleHttpResultSelected(result: any) {
    this.query = result;
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
  onMouseOver(event: any) {
    if (!this.display) {
      document.getElementById("Category").classList.remove('display-none');
    }
  }
  onMouseOut(event: any) {
    if (!this.display) {
      document.getElementById("Category").classList.add('display-none');
    }
  }
  onMouseClick(event: any) {
    this.display = !this.display;
    if (this.display) {
      document.getElementById("Category").classList.remove('display-none');
    }
  }
  recieveMessage($event) {
    let that = this;
    that.loginDetails = JSON.parse($event);
    if (Object.keys(that.loginDetails).length != 0) {
      var el = document.getElementById("loginBtn");
      el.dataset.toggle = "";
      that.signInModalHide = true;
      that.mouseOverOut = true;
      localStorage.setItem('googleLoginDetails', JSON.stringify(that.loginDetails));
    }
  }
  logOut() {
    var el = document.getElementById("loginBtn");
    el.dataset.toggle = "modal";
    this.loginDetails = {};
    this.signInModalHide = false;
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.setItem('googleLoginDetails', null);
      console.log('User signed out.');
    });
  }
  mouseOver($event) {
    this.mouseOverOut = true;
  }
  mouseOut($event) {
    this.mouseOverOut = false;
  }
  ngAfterViewInit() {
    let logindata = localStorage.getItem('googleLoginDetails');
    var el = document.getElementById("loginBtn");
    if (JSON.parse(logindata) != null && JSON.parse(logindata) != undefined && JSON.parse(logindata) != '{}') {
      this.loginDetails = JSON.parse(logindata);
      this.signInModalHide = true;
      el.dataset.toggle = "";
    }
    else {
      this.signInModalHide = false;
      el.dataset.toggle = "modal";
    }
  }
}