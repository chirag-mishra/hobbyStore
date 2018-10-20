import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class ApiService{
    constructor(){}

    public getProductDetails(id: any, next:any){
        fetch(commonWrapper.apiRoot + '/getProductById/'+id)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            next(myJson) ;
        }).catch(function(error){
            next('error');
        });
    }
}