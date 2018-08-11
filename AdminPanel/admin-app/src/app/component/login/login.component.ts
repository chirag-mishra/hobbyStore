import { Component } from "@angular/core";

@Component({
    selector:"login",
    templateUrl:"./login.component.html",
    styleUrls:['./login.component.css']
})
export class LoginComponent{

    isLoginButtonClicked:boolean;

    loginDetailsObj:any={
        userEmailId:'',
        userPassword:''
    }

    constructor(){
        this.isLoginButtonClicked =false;
    }

    onLoginSubmit(){
        this.isLoginButtonClicked = true;
    }
    isValidEmail(value:any){
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.isLoginButtonClicked && regex.test(value))
        {
            return true;
        }
    }


}