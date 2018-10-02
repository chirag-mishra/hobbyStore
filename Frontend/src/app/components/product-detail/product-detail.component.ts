import { Component, OnInit } from '@angular/core';
import { ProductRating } from "./../../shared/product-rating";

import { Router, ActivatedRoute } from '@angular/router';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
import { ApiService } from '../../shared/api.service';
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    providers: [ApiService]
})
export class ProductDetailComponent implements OnInit {
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
    productsObj: any;

    commentObj: any = [
        {
            userName: "Rakesh",
            rating: '',
            title: '',
            decription: ''
        }
    ];
    similarProductObjects: any;

    constructor(private route: ActivatedRoute, private router: Router,
        private cartdata: CartsharedService,
        private apiService: ApiService) {
        this.onStarClick = false;
        //this.itemImageUrl = "";
        this.inStockText = "In Stock";
        this.qtyInput = 1;
        this.addToCartText = "Add to Cart";
        this.starRating = [0, 1, 2, 3, 4];
        this.rate = 0;

        var parent = this;
        let id = this.route.snapshot.params["id"];
        this.apiService.getProductDetails('5b96bba1355e53554ba9d6c6', function (productsObj) {
            parent.productsObj = productsObj;
            console.log(parent.productsObj);
            parent.itemImageUrl = productsObj.imgUrls[0];
            parent.reviewObj = productsObj.reviews;
            let bodyObject = {
                "category": parent.productsObj.category[0]
            }
            fetch(commonWrapper.apiRoot + '/getProductsForCategory/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bodyObject)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                parent.similarProductObjects = data;
            });
        });

        // this.productsObj={
        //     "_id":"",
        //     "title":"",
        //     "description":[],
        //     "specification":[],
        //     "imgUrls":[],
        //     "rating":0,
        //     "price":0,
        //     "discount":0,
        //     "category":[],
        //     "genre":"",
        //     "stock":0,
        //     "date":"",
        //     "reviews":[
        //         {"userName": "",
        //         "rating": 0,
        //         "title": "",
        //         "description": ""}
        //     ]
        // }
        // this.similarProductObjects=[{
        //     category: [],
        //     date: "",
        //     discount: 0,
        //     genre: "",
        //     imgUrl: "",
        //     price: 0,
        //     rating: 0,
        //     stock: 0,
        //     title: "",
        //     _id: ""
        // }]
    }
    ngOnInit() {
        
        // fetch(commonWrapper.apiRoot + '/getProductById/5b96bba1355e53554ba9d6c6')
        // .then(function(response) {
        //   return response.json();
        // })
        // .then(function(myJson) {
        //    parent.productsObj= (myJson);
        //     let bodyObject = {
        //      "category":parent.productsObj.category[0]
        //    }
        //     fetch(commonWrapper.apiRoot + '/getProductsForCategory/', {
        //         method: 'post',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(bodyObject)
        //     }).then(function (response) {
        //         return response.json();
        //     }).then(function (data) {
        //         console.log(data);
        //         parent.similarProductObjects=data;
        //     });
        // // if (parent.productsObj.stock == 0) {
        // //     parent.outOfStock = true;
        // //     parent.qtyInput = 0;
        // //     parent.addToCartText = "Out of Stock"
        // // }
        // parent.itemImageUrl = parent.productsObj.imgUrls[0];
        // parent.reviewObj = parent.productsObj.reviews;
        // });

    }
    imageChange(value: any) {
        this.itemImageUrl = value.path[0].src;
    }
    onMouseOverRating(value: any) {
        if (!this.onStarClick) {
            this.rate = parseInt(value.target.id);
        }
    }
    onMouseClickRating(value: any) {
        this.onStarClick = !this.onStarClick;
        this.rate = parseInt(value.target.id);
    }
    onMouseOutRating(value: any) {
        if (!this.onStarClick) {
            this.rate = 0;
        }
    }
    scrollToRatingDiv() {
        document.querySelector('#reviewForm').scrollIntoView({
            behavior: 'smooth'
        });
    };
    onCommentSubmit() {
        // if(this.rate>0){
        //     this.prodRatinObj = new ProductRating();
        //     this.prodRatinObj.comment.rating = this.rate;
        //     this.prodRatinObj.comment.title= this.commentObj.title!=undefined ?this.commentObj.title : "";
        //     this.prodRatinObj.comment.description = this.commentObj.decription!=undefined?// // this.commentObj.decription:"";
        //     console.log(this.prodRatinObj);
        // }
    }
    AddTotalQuantitytoCart() {
        let id = this.route.snapshot.params['id'];
        localStorageWrapper.addToCart({ "productId": id, "quantity": this.qtyInput });
    }

}