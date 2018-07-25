import { Component,Input } from '@angular/core';
import { ProductRating } from "./../../shared/product-rating";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls:['./product-detail.component.css']
})
export class ProductDetailComponent {
    public prodRatinObj:ProductRating;
    rate:number;
    starRating:number[];
    qtyInput:number;
    itemImageUrl:string; 
    reviewObj :any;
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
          "title": "Ace",
          "price": 250,
          "discount":50.5,
          "rating": 1,
          "date" : '2018-05-22'
        }
    }];
    images:string[]=["assets/images/bicycleCards/BicycleCard1.jpg","assets/images/bicycleCards/BicycleCard2.jpg","assets/images/bicycleCards/BicycleCard1.jpg"];
    constructor(){
        this.qtyInput=1;
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
    }
    decreaseQty(){
        this.qtyInput=this.qtyInput-1 < 0 ? 0 : --this.qtyInput;
    }   
    imageChange(value:any){
        this.itemImageUrl=value.path[0].src;
    }
    onMouseOverRating(value:any){
        this.rate=parseInt(value.target.id);
    }
    scrollToRatingDiv (){
        document.querySelector('#' + 'itemComment').scrollIntoView({
          behavior: 'smooth'
        });
      };
    onCommentSubmit(){
        // if(this.rate>0){
        //     this.prodRatinObj = new ProductRating();
        //     this.prodRatinObj.comment.rating = this.rate;
        //     this.prodRatinObj.comment.title= this.commentObj.title!=undefined ?this.commentObj.title : "";
        //     this.prodRatinObj.comment.description = this.commentObj.decription!=undefined?this.commentObj.decription:"";
        //     console.log(this.prodRatinObj);
        // }
    }
}