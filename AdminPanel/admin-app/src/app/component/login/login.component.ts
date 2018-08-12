import { Component } from "@angular/core";
import { Router } from '@angular/router';
@Component({
    selector:"login",
    templateUrl:"./login.component.html",
    styleUrls:['./login.component.css']
})
export class LoginComponent{

    isLoginButtonClicked:boolean;
    isValidEid:boolean;
    isValidPwd:boolean;
    loginDetailsObj:any={
        userEmailId:'',
        userPassword:''
    }

    constructor(private router:Router){
        this.isLoginButtonClicked =false;
        this.isValidEid = false;
        this.isValidPwd =false;
        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('userLoginDetails');
        if(retrievedObject!= null || retrievedObject !=undefined){
            console.log('retrievedObject: ', (JSON.parse(retrievedObject)));
            this.router.navigateByUrl("admin");
        }
        else{
            console.log('retrievedObject: ', (JSON.parse(retrievedObject)));
        }
        
    }

    onLoginSubmit() {
        this.isLoginButtonClicked = true;
        this.isValidEmail(this.loginDetailsObj.userEmailId);
        this.isValidPassword(this.loginDetailsObj.userPassword);
        if (!(this.isValidEid) && !(this.isValidPwd)) {
            console.log(this.loginDetailsObj);
            localStorage.setItem('userLoginDetails', JSON.stringify(this.loginDetailsObj));
            window.location.href = "/";
        }
    }
    isValidEmail(value:any){
        //console.log(value);
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.isLoginButtonClicked)
        {
            if(regex.test(value.trim()))
            this.isValidEid =false;
            else
            this.isValidEid = true;
            
        }
    }
    isValidPassword(value:any){
        if(this.isLoginButtonClicked)
        {
            if((value.trim()).length > 7)
            this.isValidPwd =false;
            else
            this.isValidPwd = true;
            
        }
    }

}