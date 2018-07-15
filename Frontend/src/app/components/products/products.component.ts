import { Component, Input } from '@angular/core';
import { PaginationInstance } from '../../../../node_modules/ngx-pagination/dist/ngx-pagination.module';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  p: number = 1;
  productsObject = {
    products: [
      {
        "id": 1,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 2,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 3,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 4,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 5,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 6,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 7,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 8,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 9,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 10,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 11,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 12,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 13,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 2110,
        "rating": 5
      },
      {
        "id": 14,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 21110,
        "rating": 5
      },
      {
        "id": 15,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 270,
        "rating": 5
      },
      {
        "id": 16,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 17,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      },
      {
        "id": 18,
        "imgUrl": "assets/images/demo.jpg",
        "title": "Bicycle",
        "price": 250,
        "rating": 5
      }
    ]
  }
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

  onPageChange(number: number) {
    this.config.currentPage = number;
  }
}