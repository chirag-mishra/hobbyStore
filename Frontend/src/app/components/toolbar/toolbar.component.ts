import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  title: any = ["Cards", "Premium Cards", "Intermmediate Cards", "Tuple Cards", "Beginner Cards", "Jumbo cards"];
  toolbarItems: any[] = ["Cards", "Premium Cards", "Intermediate Cards", "Tuple Cards", "Beginner Cards", "Jumbo cards"];
}