export class CartProductInfo {
            "userid": number;
            addresses:
                [{
                    "title": string,
                    "firstname": string,
                    "lastname": string,
                    "email": string,
                    "contact": number,
                    "address": string,
                    "landmark": string,
                    "city": string,
                    "state": string,
                    "pincode": number
                }];
            cartproductdetails:
                [{
                    "productid": number,
                    "category": string,
                    "imageurl": string,
                    "costprice": number,
                    "displayprice": number,
                    "markprice": number,
                    "quantity": number,
                    "title": string,
                    "variant": string,
                    "availablestock": number
                }]
            }
        