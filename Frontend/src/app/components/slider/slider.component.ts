import { Component } from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent {
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
}
