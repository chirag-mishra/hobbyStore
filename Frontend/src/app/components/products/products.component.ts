import { Component, Input } from '@angular/core';
import { PaginationInstance } from '../../../../node_modules/ngx-pagination/dist/ngx-pagination.module';
import { StringFilterPipe } from './../../shared/string-filter.pipe';
import { OrderPipe } from 'ngx-order-pipe';
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
productObjects : any=
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
    }, {
      "id": 6,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "King",
          "price": 1250,
          "discount":10,
          "rating": 5,
          "date" : '2018-03-30'
        }
    }, {
      "id": 7,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 250,
          "discount":50,
          "rating": 5,
          "date" : '2018-01-21'
        }
    }, {
      "id": 8,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Queen",
          "price": 250,
          "discount":0,
          "rating": 5,
          "date" : '2017-04-14'
        }
    }, {
      "id": 9,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 250,
          "discount":5,
          "rating": 2.5,
          "date" : '2017-06-22'
        }
    }, {
      "id": 10,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle Cards",
          "price": 250,
          "discount":50,
          "rating": 5,
          "date" : '2018-02-22'
        }
    }, {
      "id": 11,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "BlackJack",
          "price": 250,
          "discount":0,
          "rating": 5,
          "date" : '2018-02-14'
        }
    }, {
      "id": 12,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 250,
          "discount":7,
          "rating": 5,
          "date" : '2018-02-22'
        }
    }, {
      "id": 13,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 2110,
          "discount":10,
          "rating": 5,
          "date" : '2018-02-22'
        }
    }, {
      "id": 14,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 21110,
          "discount":10,
          "rating": 5,
          "date" : '2017-12-22'
        }
    }, {
      "id": 15,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 270,
          "discount":10,
          "rating": 5,
          "date" : '2018-10-21'
        }
    }, {
      "id": 16,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 5550,
          "discount":0,
          "rating": 5,
          "date" : '2018-05-22'
        }
    }, {
      "id": 17,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle",
          "price": 250,
          "discount":0,
          "rating": 5,
          "date" : '2018-02-02'
        }
    }, {
      "id": 18,
      products:
        {
          "imgUrl": "assets/images/demo.jpg",
          "title": "Bicycle123",
          "price": 250,
          "discount":50,
          "rating": 5,
          "date" : '2017-08-22'
        }
    }
  ];
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
  constructor(private orderPipe: OrderPipe) {
    this.sortedCollection = this.orderPipe.transform(this.productObjects, 'products.rating');
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
  order: string = 'products.rating';
  reverse: boolean = true;
  setOrder(value: any) {
    switch (value) {
      case "Popularity":
        value = 'products.rating';
        this.reverse = true;
        break;
      case "Discount":
        value = 'products.discount';
        this.reverse = true;
        break;
      case "New":
        value = 'products.date'
        this.reverse = true;
        break;
      case "Price - High to Low":
        value = 'products.price';
        this.reverse = true;
        break;
      case "Price - Low to High":
        value = 'products.price';
        this.reverse = false;
        break;
      default:
        break;
    }
    this.order = value;
  }

}