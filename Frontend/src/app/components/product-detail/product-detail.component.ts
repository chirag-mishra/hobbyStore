import { Component,Input } from '@angular/core';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls:['./product-detail.component.css']
})
export class ProductDetailComponent {

    qtyInput:number;
    itemImageUrl:string; 
    images:string[]=["assets/images/bicycleCards/BicycleCard1.jpg","assets/images/bicycleCards/BicycleCard2.jpg","assets/images/bicycleCards/BicycleCard1.jpg"];
    constructor(){
        this.qtyInput=1;
        this.itemImageUrl = 'assets/images/bicycleCards/BicycleCard1.jpg';
    }
    increaseQty(){
        ++this.qtyInput;
    }
    decreaseQty(){
        this.qtyInput=this.qtyInput-1 < 0 ? 0 : --this.qtyInput;
    }   
    imageChange(value:any){
        this.itemImageUrl=value.path[0].src;
    }
}