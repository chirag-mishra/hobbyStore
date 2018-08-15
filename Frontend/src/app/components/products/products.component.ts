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
//   [
//     {
//       products:
//         {
//           "_id": 1,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 250,
//           "discount":10,
//           "rating": 5,
//           "date" : '2018-06-22'
//         }
//     },
//     {
      
//       products:
//         {
//           "_id": 2,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Spades",
//           "price": 250,
//           "discount":20,
//           "rating": 4.4,
//           "date" : '2018-06-02'
//         }
//     },
//     {
     
//       products:
//         {
//           "_id": 3,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Hearts",
//           "price": 2500,
//           "discount":30,
//           "rating": 3.5,
//           "date" : '2018-05-24'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 4,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Diamond",
//           "price": 250,
//           "discount":40,
//           "rating": 2.3,
//           "date" : '2018-06-13'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 5,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Ace",
//           "price": 250,
//           "discount":50.5,
//           "rating": 1,
//           "date" : '2018-05-22'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 6,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "King",
//           "price": 1250,
//           "discount":10,
//           "rating": 5,
//           "date" : '2018-03-30'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 7,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 250,
//           "discount":50,
//           "rating": 5,
//           "date" : '2018-01-21'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 8,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Queen",
//           "price": 250,
//           "discount":0,
//           "rating": 5,
//           "date" : '2017-04-14'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 9,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 250,
//           "discount":5,
//           "rating": 2.5,
//           "date" : '2017-06-22'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 10,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle Cards",
//           "price": 250,
//           "discount":50,
//           "rating": 5,
//           "date" : '2018-02-22'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 11,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "BlackJack",
//           "price": 250,
//           "discount":0,
//           "rating": 5,
//           "date" : '2018-02-14'
//         }
//     }, {
     
//       products:
//         {
//           "_id": 12,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 250,
//           "discount":7,
//           "rating": 5,
//           "date" : '2018-02-22'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 13,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 2110,
//           "discount":10,
//           "rating": 5,
//           "date" : '2018-02-22'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 14,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 21110,
//           "discount":10,
//           "rating": 5,
//           "date" : '2017-12-22'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 15,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 270,
//           "discount":10,
//           "rating": 5,
//           "date" : '2018-10-21'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 16,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 5550,
//           "discount":0,
//           "rating": 5,
//           "date" : '2018-05-22'
//         }
//     }, {
     
//       products:
//         {
//           "_id": 17,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle",
//           "price": 250,
//           "discount":0,
//           "rating": 5,
//           "date" : '2018-02-02'
//         }
//     }, {
      
//       products:
//         {
//           "_id": 18,
//           "imgUrl": "assets/images/demo.jpg",
//           "category":"Cards",
//           "title": "Bicycle123",
//           "price": 250,
//           "discount":50,
//           "rating": 5,
//           "date" : '2017-08-22'
//         }
//     }
//   ];
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
    fetch('http://4b7b27b3.ngrok.io/products/magic')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          parent.productObjects=(myJson);
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