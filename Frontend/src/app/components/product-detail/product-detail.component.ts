import { Component, OnInit } from '@angular/core';
import { ProductRating } from "./../../shared/product-rating";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    userdetails: any;
    isError: boolean;
    commentObj: any = [
        {
            userName: "Rakesh",
            rating: '',
            title: '',
            decription: ''
        }
    ];
    similarProductObjects: any;
    showUpdateSpinner: boolean;
    constructor(private route: ActivatedRoute, private router: Router,
        private userdata: CartsharedService,
        private apiService: ApiService) {
        this.showUpdateSpinner = false;
        this.onStarClick = false;
        //this.itemImageUrl = "";
        this.inStockText = "In Stock";
        this.qtyInput = 1;
        this.addToCartText = "Add to Cart";
        this.starRating = [0, 1, 2, 3, 4];
        this.rate = 0;
        this.isError = false;
    }
    ngOnInit() {
        var parent = this;
        let id;
        this.route.paramMap.subscribe((params: ParamMap) => {
            id = params.get('id');
            parent.productsObj = undefined;
            this.apiService.getProductDetails(id, function (productsObj) {
                if (productsObj == 'error') {
                    parent.isError = true;
                }
                else {
                    parent.productsObj = productsObj;
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
                        parent.similarProductObjects = data;
                    }).catch(function (error) {
                        parent.isError = true;
                    });
                }
            })
        });
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
    AddItemtoCart(productId: any) {
        let id;
        if (productId == undefined) {
            id = this.route.snapshot.params['id'];
        }
        else {
            id = productId;
        }
        commonWrapper.addItemToCart(id, this,false);
    }

    BuyNowProduct(productId: any) {
        commonWrapper.addItemToCart(productId, this,true);
    }
}