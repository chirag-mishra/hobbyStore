import { Component } from '@angular/core';
import '../../shared/countDownTimer.js';
import { DatePipe } from '@angular/common'
@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent {
    time:string;
    starRating:number[];
    products:any;
    //slider images object 
    sliderObject = {
        "images": [
            {
                "imgUrl": "assets/images/img1.jpg",
                "imgTag": "Live for today, plan for tomorrow, party tonight.",
                "imgDescription": "You only live once!"
            },
            {
                "imgUrl": "assets/images/img2.jpg",
                "imgTag": "Forgive, yes. Forget, never.",
                "imgDescription": "Catch flights not Feelings!"
            },
            {
                "imgUrl": "assets/images/img3.jpg",
                "imgTag": "50% Savage. 50% Sweetness.",
                "imgDescription": "Exhale the bullshit!"
            }

        ]
    };
    constructor(public datepipe: DatePipe){
        let interval = setInterval(() => {
            let presentTime = this.datepipe.transform(new Date(), 'MMM d, y, HH:mm:ss');
            let duration = countDownTimer.countDown("Nov 10, 2018 20:53:00",presentTime);
            //console.log(duration);
            this.time =duration;
            if(duration ==  "false")
            {
            clearInterval(interval);
            this.time = "00:00:00:00";
            };
          },1000);
          this.starRating = [0, 1, 2, 3, 4];
    this.products= [{"_id":"5b81509c355e53554ba9d6ac","imgUrl":"assets/images/demo.jpg","category":["close up","cards"],"title":"Bicycle","price":250,"discount":10,"rating":5,"stock":5,"date":"2018-06-22","genre":"magic"},{"_id":"5b81509c355e53554ba9d6ad","imgUrl":"assets/images/demo.jpg","category":["close up","cards"],"title":"Spades","price":250,"discount":20,"rating":4.4,"genre":"magic","stock":5,"date":"2018-06-02"},{"_id":"5b81509c355e53554ba9d6ae","imgUrl":"assets/images/demo.jpg","category":["close up","cards"],"title":"Hearts","price":2500,"discount":30,"rating":3.5,"genre":"magic","stock":5,"date":"2018-05-24"}];
    };
}
