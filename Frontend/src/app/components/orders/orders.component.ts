import { Component,OnInit } from "@angular/core";
import { ApiService } from '../../shared/api.service';
@Component({
    selector:"orders",
    templateUrl:"./orders.component.html",
    styleUrls:['./orders.component.css'],
    providers: [ApiService]
})
export class OrdersComponent implements OnInit{
    imgUrl:any="../assets/images/demo.jpg";
    orders:any;
    isError:boolean;
    constructor(private apiService: ApiService){
        this.isError=false;
    }
    ngOnInit(){
        let parent = this;
        let emailId = 'sanat@hobbyfare.com';
        this.orders=undefined;
        this.apiService.getOrdersForUser(emailId, function (ordersObj) {
            if(ordersObj == 'error'){
                this.orders=undefined;
                this.isError=true;
            }
            else{
                parent.orders = ordersObj;
            }
        });
    }
}