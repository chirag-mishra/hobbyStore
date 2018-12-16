import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from '../../../../node_modules/ngx-pagination/dist/ngx-pagination.module';
import { StringFilterPipe } from './../../shared/string-filter.pipe';
import { OrderPipe } from 'ngx-order-pipe';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../../shared/category.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //items per page array
  itemsPerPage: any = [8, 10, 20, 'All'];
  userdetails: any;
  //sort by items array
  orderByItems: any = ["Popularity", "Discount", "New", "Price - High to Low", "Price - Low to High"];
  //products objects 
  //Note:(products object should be in this format for sorting and filtering,date should be in 'yyyy-mm-dd' format)  
  productObjects: any;
  isError: boolean;
  noData:boolean;
  isActive:string;
  //paging required inputs
  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 8,
    currentPage: 1

  };
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  starRating: number[];
  //sorting required inputs
  sortedCollection: any[];
  showUpdateSpinner: boolean;
  constructor(private orderPipe: OrderPipe, private userdata: CartsharedService, private router: Router,
    private categoryService:CategoryService) {
    this.showUpdateSpinner = false;
    this.starRating = [0, 1, 2, 3, 4];
    this.isError = false;
    this.noData =false;
    this.isActive="allitems";
  }
  ngOnInit(){
    let selectCategory;
    this.categoryService.currentvalue.subscribe(item=> this.FetchItems(item));
  }
  //onclick of page number in pagination
  onPageChange(number: number) {
    this.config.currentPage = number;
  }
  //onclick of 'item per page' options 
  totalItemPerPage: string = this.config.itemsPerPage.toString();
  onItemChange(item: any) {
    this.config.itemsPerPage = item == 'All' ? this.productObjects.length : item;
    this.totalItemPerPage = item;
  }
  //onclick items sorting
  sortProperty: string = "Popularity";
  order: string = 'rating';
  reverse: boolean = true;
  setOrder(value: any) {
    switch (value) {
      case "Popularity":
        value = 'rating';
        this.reverse = true;
        break;
      case "Discount":
        value = 'discount';
        this.reverse = true;
        break;
      case "New":
        value = 'date'
        this.reverse = true;
        break;
      case "Price - High to Low":
        value = 'price';
        this.reverse = true;
        break;
      case "Price - Low to High":
        value = 'price';
        this.reverse = false;
        break;
      default:
        break;
    }
    this.order = value;
  }
  
  AdditemtoCart(productId: any) {
    commonWrapper.addItemToCart(productId, this,false);
  }

  BuyNowProduct(productId: any) {
    commonWrapper.addItemToCart(productId, this,true);
  }

  FetchItems(param:any){
    let category;
    if(param == "allitems"){
      this.isActive=param;
      category='magic';
    }
    else if (param == "accessories"){
      this.isActive=param;
      category='magic';
    }
    else if(param == "beginners"){
      this.isActive=param;
      category='xyz';
    }
    else if (param == "closeup"){
      this.isActive=param;
      category='pqr';
    }
    else if(param == "mentalism"){
      this.isActive=param;
      category='abc';
    }
    else if (param == "cardmagic"){
      this.isActive=param;
      category='magic';
    }
    var parent = this;
    parent.productObjects = undefined;
    fetch(commonWrapper.apiRoot + '/products/'+category)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        if(myJson.length == 0 || myJson == [])
        {
          parent.noData=true;
          parent.productObjects = undefined;
          parent.isError = false;
        }
        else
        {
          parent.productObjects = (myJson);
          parent.sortedCollection = parent.orderPipe.transform(parent.productObjects, 'rating');
          parent.productObjects = parent.sortedCollection;
        }
      }).catch(function (error) {
        parent.productObjects = undefined;
        parent.isError = true;
      });
  }
}