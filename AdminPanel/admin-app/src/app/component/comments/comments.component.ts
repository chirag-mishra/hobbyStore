import { Component } from "@angular/core";
import { Router } from '@angular/router';
@Component({
    selector:"app-comments",
    templateUrl:"./comments.component.html",
    styleUrls:['./comments.component.css']
})

export class CommentsComponent{
    comments:any[];
    sortByItems:any[];
    order = "rating";
    orderBy="Rating asc";
    ascending = true;
    constructor(private router:Router){
        this.sortByItems=["Rating asc","Rating desc","Date asc","Date desc"]
        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('userLoginDetails');
        if(retrievedObject== null || retrievedObject ==undefined){
            this.router.navigateByUrl("/");
        }
        this.comments=[{
            "_id":"5b81509c355e53554ba9d6bd",
            "productName":"BlackJack",
            "name":"Mark",
            "title":"Nice product!",
            "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor.",
            "rating":"5",
            "date":"2018-06-23"
        },
        {
            "_id":"5d81509c321e5355sb21d6b4",
            "productName":"Magic Tricks",
            "name":"Jason",
            "title":"Nice product!",
            "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor.",
            "rating":"2",
            "date":"2018-06-20"
        },
        {
            "_id":"5s81509jjj5e53554ba9d2b2",
            "productName":"Queens Card",
            "name":"Mark",
            "title":"Nice product!",
            "description":"Lorem ipsum dolor sit amet, amet condimentum montes ac voluptatum. In et amet ut nunc ipsum, viverra nonummy et, scelerisque leo in nunc velit nec, ultricies vel eros sed potenti condimentum, hendrerit elit curabitur maecenas. Tortor arcu vestibulum et maecenas vivamus integer, sapien eu malesuada vitae pede cursus, sed eu magna gravida dolor.",
            "rating":"1",
            "date":"2018-06-21"
        }]
    }
    acceptComment(id:any){
        console.log(id);
    }
    rejectComment(id:any){
        console.log(id);
    }
    sortBy(value: any) {
        switch (value) {
            case "Rating asc":
                this.ascending = true;
                this.order = "rating"
                break;
            case "Rating desc":
                this.ascending = false;
                this.order = "rating"
                break;
            case "Date asc":
                this.ascending = true;
                this.order = "date"
                break;
            case "Date desc":
                this.ascending = false;
                this.order = "date"
                break;
            default:
                break;
        }
    }
}