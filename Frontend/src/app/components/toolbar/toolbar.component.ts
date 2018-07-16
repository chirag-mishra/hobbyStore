import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  toolbarInfo: any = {
    toolbarDetails: [
      {
        "id": 1,
        "title": "Cards",
        "toolbarName": "Cards"
      },
      {
        "id": 2,
        "title": "Beginner Cards",
        "toolbarName": "Beginner Cards"
      },
      {
        "id": 3,
        "title": "Intermmediate Cards",
        "toolbarName": "Intermmediate Cards"
      },
      {
        "id": 4,
        "title": "Premium Cards",
        "toolbarName": "Premium Cards"
      },
      {
        "id": 5,
        "title": "Royal Cards",
        "toolbarName": "Royal Cards"
      },
      {
        "id": 6,
        "title": "Tuple Cards",
        "toolbarName": "Tuple Cards"
      },
    ]
  }
}