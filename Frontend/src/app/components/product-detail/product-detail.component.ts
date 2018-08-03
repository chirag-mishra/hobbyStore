import { Component } from '@angular/core';
import { ProductRating } from "./../../shared/product-rating";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls:['./product-detail.component.css']
})
export class ProductDetailComponent {
    public prodRatinObj:ProductRating;
    rate:number;
    onStarClick:boolean;
    starRating:number[];
    qtyInput:number;
    itemImageUrl:string; 
    reviewObj :any;
    outOfStock:boolean;
    addToCartText:string;
    inStockText:string;
    productsObj : any = {
        "title":"BICYCLE BIG BOX PLAYING CARDS",
        "description":["Big Box cards are a super-sized alternative!","Want to be a hit at your next game night? Be sure to pick up Bicycle ® Big Box playing cards. A fun, super-sized alternative to regular cards."],
        "specification":["Bicycle Big Box Playing Cards feature the classic rider back design","Big Box playing cards measure 7\" x 4.5\”","Available in red or blue","Perfect for all ages","Great for play, as a novelty item, for decorating, and more"],
        "rating":4,
        "totalReview":61,
        "price":129,
        "quantity":2
    }
    commentObj: any = [
        {
            userName:"Rakesh",
            rating:'',
            title:'',
            decription:''
        }
    ];
    similarProductObjects : any=
  [
    {
      "id": 1,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "category":"Cards",
          "title": "Bicycle",
          "price": 250,
          "discount":10,
          "rating": 5,
          "date" : '2018-06-22'
        }
    },
    {
      "id": 2,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "category":"Cards",
          "title": "Spades",
          "price": 250,
          "discount":20,
          "rating": 4.4,
          "date" : '2018-06-02'
        }
    },
    {
      "id": 3,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "category":"Cards",
          "title": "Hearts",
          "price": 2500,
          "discount":30,
          "rating": 3.5,
          "date" : '2018-05-24'
        }
    }, {
      "id": 4,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "category":"Cards",
          "title": "Diamond",
          "price": 250,
          "discount":40,
          "rating": 2.3,
          "date" : '2018-06-13'
        }
    }, {
      "id": 5,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "category":"Cards",
          "title": "Ace",
          "price": 250,
          "discount":50.5,
          "rating": 1,
          "date" : '2018-05-22'
        }
    }];
    images:string[]=["assets/images/bicycleCards/BicycleCard1.jpg","assets/images/bicycleCards/BicycleCard2.jpg","assets/images/bicycleCards/BicycleCard1.jpg"];
    constructor(private route:ActivatedRoute,private router:Router){
        this.onStarClick=false;
        this.inStockText = "In Stock";
        this.qtyInput=1;
        this.addToCartText = "Add to Cart";
        if (this.productsObj.quantity == 0) {
            this.outOfStock =true;
            this.qtyInput=0;
            this.addToCartText = "Out of Stock"
        }
        this.itemImageUrl = 'assets/images/bicycleCards/BicycleCard1.jpg';
        this.starRating =[0,1,2,3,4];
        this.rate=0;
        this.reviewObj = [{
            "id":1,
            comment:{
                "userName":"Mark Buffon",
                "rating":5,
                "title":"Very Good!",
                "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor."
            }
        },
        {
            "id":2,
            comment:{
                "userName":"Mark Buffon",
                "rating":4,
                "title":"Very Good, Awesome!",
                "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec."
            }
        },
        {
            "id":3,
            comment:{
                "userName":"Anonymous",
                "rating":3,
                "title":"Nice product!",
                "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor."
            }
        },
        {
            "id":4,
            comment:{
                "userName":"Anonymous",
                "rating":2,
                "title":"Very Good!",
                "description":""
            }
        },
        {
            "id":5,
            comment:{
                "userName":"Vikram Yadav",
                "rating":1,
                "title":"",
                "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum."
            }
        }]
    }
    increaseQty(){
        ++this.qtyInput;
        if(this.qtyInput>parseInt(this.productsObj.quantity))
        {
            this.inStockText ="Sorry, quantity is greater than available stock."
        }       
    }
    decreaseQty(){
        this.qtyInput=this.qtyInput-1 < 0 ? 0 : --this.qtyInput;
        if(this.qtyInput<=parseInt(this.productsObj.quantity)){
            this.inStockText = "In Stock";
        }
        
    }   
    imageChange(value:any){
        this.itemImageUrl=value.path[0].src;
    }
    onMouseOverRating(value:any){
        if(!this.onStarClick){
            this.rate=parseInt(value.target.id);
        }
    }
    onMouseClickRating(value:any){
        this.onStarClick=!this.onStarClick;
        this.rate=parseInt(value.target.id);
    }
    onMouseOutRating(value:any){
        if (!this.onStarClick) {
            this.rate=0;
        } 
    }
    scrollToRatingDiv (){
        document.querySelector('#reviewForm').scrollIntoView({
          behavior: 'smooth'
        });
      };
    onCommentSubmit(){
        // if(this.rate>0){
        //     this.prodRatinObj = new ProductRating();
        //     this.prodRatinObj.comment.rating = this.rate;
        //     this.prodRatinObj.comment.title= this.commentObj.title!=undefined ?this.commentObj.title : "";
        //     this.prodRatinObj.comment.description = this.commentObj.decription!=undefined?// // this.commentObj.decription:"";
        //     console.log(this.prodRatinObj);
        // }
    }
}