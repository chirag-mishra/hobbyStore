import { Component, Input } from '@angular/core';
import { PaginationInstance } from '../../../../node_modules/ngx-pagination/dist/ngx-pagination.module';
import { StringFilterPipe } from './../../shared/string-filter.pipe';
import { OrderPipe } from 'ngx-order-pipe';
import { CartsharedService } from '../../shared/cartsharedservice/cartshared.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
//items per page array
itemsPerPage: any = [8,10,20,'All'];
//sort by items array
orderByItems : any =["Popularity","Discount","New","Price - High to Low", "Price - Low to High"];
//products objects 
//Note:(products object should be in this format for sorting and filtering,date should be in 'yyyy-mm-dd' format)  
 productObjects : any;

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
  //sorting required inputs
  sortedCollection: any[];
  constructor(private orderPipe: OrderPipe,private cartdata:CartsharedService) {
    var parent = this;
    fetch('http://7c492ffb.ngrok.io/products/magic')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
           parent.productObjects= (myJson);
        });
    this.sortedCollection = this.orderPipe.transform(this.productObjects, 'rating');
    this.productObjects = this.sortedCollection;
  }
  //onclick of page number in pagination
  onPageChange(number: number) {
    this.config.currentPage = number;
  }
  //onclick of 'item per page' options 
  totalItemPerPage : string = this.config.itemsPerPage.toString();
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
  AdditemtoCart()
  {
    this.cartdata.changecartvalue(1);
  }
}