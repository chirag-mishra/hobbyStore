import { Component } from '@angular/core';
import { ProductRating } from "./../../shared/product-rating";

import { Router, ActivatedRoute } from '@angular/router';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls:['./product-detail.component.css']
})
export class ProductDetailComponent {
    public prodRatinObj: ProductRating;
    rate: number;
    onStarClick: boolean;
    starRating: number[];
    qtyInput: number;
    itemImageUrl: string;
    reviewObj: any;
    outOfStock: boolean;
    addToCartText: string;
    inStockText: string;
    productsObj: any={
        "_id": "5b65f05916fd446a62cae4b4",
        "title": "BICYCLE BIG BOX PLAYING CARDS",
        "description": ["Big Box cards are a super-sized alternative!", "Want to be a hit at your next game night? Be sure to pick up Bicycle ® Big Box playing cards. A fun, super-sized alternative to regular cards."],
        "specification": ["Bicycle Big Box Playing Cards feature the classic rider back design", "Big Box playing cards measure 7\" x 4.5\”", "Available in red or blue", "Perfect for all ages", "Great for play, as a novelty item, for decorating, and more"],
        "rating": 4,
        "totalReview": 61,
        "price": 129,
        "quantity": 2,
        "imgUrls": ["assets/images/bicycleCards/BicycleCard1.jpg", "assets/images/bicycleCards/BicycleCard2.jpg", "assets/images/bicycleCards/BicycleCard1.jpg"]
    };
    commentObj: any = [
        {
            userName:"Rakesh",
            rating:'',
            title:'',
            decription:''
        }
    ];
    similarProductObjects: any =
        [
            {
                "_id": "5b65f05916fd446a92cae4b4",
                "imgUrl": "assets/images/demo.jpg",
                "category": "Cards",
                "title": "Bicycle",
                "price": 250,
                "discount": 10,
                "rating": 5,
                "date": '2018-06-22'
            },
            {
                "_id": "5b612f05916fd446a92cae4b4",
                "imgUrl": "assets/images/demo.jpg",
                "category": "Cards",
                "title": "Bicycle",
                "price": 250,
                "discount": 10,
                "rating": 5,
                "date": '2018-06-22'
            },
            {
                "_id": "5b65f0521916fd446a92cae4b4",
                "imgUrl": "assets/images/demo.jpg",
                "category": "Cards",
                "title": "Bicycle",
                "price": 250,
                "discount": 10,
                "rating": 5,
                "date": '2018-06-22'
            }, {
                "_id": "11165f05916fd446a92cae4b4",
                "imgUrl": "assets/images/demo.jpg",
                "category": "Cards",
                "title": "Bicycle",
                "price": 250,
                "discount": 10,
                "rating": 5,
                "date": '2018-06-22'
            }, {
                "_id": "512265f05916fd446a92cae4b4",
                "imgUrl": "assets/images/demo.jpg",
                "category": "Cards",
                "title": "Bicycle",
                "price": 250,
                "discount": 10,
                "rating": 5,
                "date": '2018-06-22'
            }];
    constructor(private route: ActivatedRoute, private router: Router, private cartdata: CartsharedService) {
        this.onStarClick = false;
        this.inStockText = "In Stock";
        this.qtyInput=1;
        this.addToCartText = "Add to Cart";
        if (this.productsObj.quantity == 0) {
            this.outOfStock =true;
            this.qtyInput=0;
            this.addToCartText = "Out of Stock"
        }
        this.itemImageUrl = this.productsObj.imgUrls[0];
        this.starRating = [0, 1, 2, 3, 4];
        this.rate = 0;
        this.reviewObj = [{
            "_id": 1,
            "userName": "Mark Buffon",
            "rating": 5,
            "title": "Very Good!",
            "description": "Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor."

        },
        {
            "_id": 2,
            "userName": "Mark Buffon",
            "rating": 4,
            "title": "Very Good, Awesome!",
            "description": "Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec."

        },
        {
            "_id": 3,
            "userName": "Anonymous",
            "rating": 3,
            "title": "Nice product!",
            "description": "Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor."

        },
        {
            "_id": 4,
            "userName": "Anonymous",
            "rating": 2,
            "title": "Very Good!",
            "description": ""

        },
        {
            "_id": 5,
            "userName": "Vikram Yadav",
            "rating": 1,
            "title": "",
            "description": "Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum."

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
    AddTotalQuantitytoCart()
    {
        let id = this.route.snapshot.params['id'];
        console.log({ "_id": id, "quantity": this.qtyInput });
        localStorageWrapper.addToCart({ "_id": id, "quantity": this.qtyInput })
        this.cartdata.changecartvalue(1);
    }
    
    addsimilarproducttocart()
    {
        this.cartdata.changecartvalue(1);
    }
}