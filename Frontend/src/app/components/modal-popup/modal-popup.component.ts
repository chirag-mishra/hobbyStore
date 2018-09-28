import {Component, ElementRef, AfterViewInit,Output,EventEmitter} from '@angular/core';
declare const gapi: any;
@Component({
  selector: 'modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent {

  title:string="Hobby Fare";
  private clientId:string = '434662342378-8qs46rucvn25ptiuosflssp1g4faj83s.apps.googleusercontent.com';
  @Output() messageEvent=new EventEmitter<string>();
  private scope = [
    'profile',
    'email'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      var el = document.getElementById('googleBtn');
      that.attachSignin(el);
    });
  }
  public attachSignin(element) {
    let that = this;
    
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        let signInGoogleUser:any={
          "token":googleUser.getAuthResponse().id_token,
          "id":profile.getId(),
          "name":profile.getName(),
          "email":profile.getEmail(),
          "imgUrl":profile.getImageUrl()
        }
        that.messageEvent.emit(JSON.stringify(signInGoogleUser));
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        // YOUR CODE HERE
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  // public signOut() {
  //   let that = this;
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     let signInGoogleUser:any={}; 
  //     that.messageEvent.emit(JSON.stringify(signInGoogleUser));
  //     console.log('User signed out.');
  //   });
  // }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
