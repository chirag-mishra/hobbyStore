import { Component } from "@angular/core";

@Component({
    selector:"orders",
    templateUrl:"./orders.component.html",
    styleUrls:['./orders.component.css']
})
export class OrdersComponent{
    imgUrl:any="../assets/images/demo.jpg";
    orders:any;
    constructor(){
        this.orders=[
            {"orderId":"5b65f05916fd446a62cae4a3",
            "deliveryAddress":{
                "name":"Sanat Samantray",
                "address":"Plot no. 129, Flat No.12,Street No.12,Mahatma Apartment,Jai Society,Balewadi Azad Society,Marunji, Pune - 412234, Maharastra",
                "phone":"1234567890"
            },
            "orderStatus":[
                {
                    "status":"ordered",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"Seller has processed your order."
                },
                {
                    "status":"packed",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"Item has been dispatched from the seller warehouse."
                },
                {
                    "status":"shipped",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"XYZ Logistics-AXSO121212121."
                },
                {
                    "status":"delivered",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"XYZ Logistics-AXSO121212121."
                },
            ],
            "items":[{
                "imgUrl":"assets/images/demo.jpg",
                "title":"Bicycle Big Black Playing Card",
                "productUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "color":"black",
                "seller":"RetailNet",
                "price":"12345",
                "offer":1,
                "reviewUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "returnUrl":"#",
                "needHelpUrl":"#"
            },
            {
                "imgUrl":"assets/images/demo.jpg",
                "title":"Bicycle Big Black Playing Card",
                "productUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "color":"black",
                "seller":"RetailNet",
                "price":"12345",
                "offer":1,
                "reviewUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "returnUrl":"#",
                "needHelpUrl":"#"
            }
            ],
            "totalPrice":"1234567"
            },
            {"orderId":"5b65f05916fd446a62cae4a3",
            "deliveryAddress":{
                "name":"Sanat Samantray",
                "address":"Plot no. 129, Flat No.12,Street No.12,Mahatma Apartment,Jai Society,Balewadi Azad Society,Marunji, Pune - 412234, Maharastra",
                "phone":"1234567890"
            },
            "orderStatus":[
                {
                    "status":"ordered",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"Seller has processed your order."
                },
                {
                    "status":"packed",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"Item has been dispatched from the seller warehouse."
                },
                {
                    "status":"shipped",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"XYZ Logistics-AXSO121212121."
                },
                {
                    "status":"delivered",
                    "date":"Sun, 1st Apr",
                    "time":"9:25pm",
                    "note":"XYZ Logistics-AXSO121212121."
                },
            ],
            "items":[{
                "imgUrl":"assets/images/demo.jpg",
                "title":"Bicycle Big Black Playing Card",
                "productUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "color":"black",
                "seller":"RetailNet",
                "price":"12345",
                "offer":1,
                "reviewUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "returnUrl":"#",
                "needHelpUrl":"#"
            },
            {
                "imgUrl":"assets/images/demo.jpg",
                "title":"Bicycle Big Black Playing Card",
                "productUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "color":"black",
                "seller":"RetailNet",
                "price":"12345",
                "offer":1,
                "reviewUrl":"/products/cards/5b65f05916fd446a62cae4a4",
                "returnUrl":"#",
                "needHelpUrl":"#"
            }
            ],
            "totalPrice":"1234567"
            }
        ]
    }
}