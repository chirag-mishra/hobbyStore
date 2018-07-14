import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

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
      }
    ]
  }
}