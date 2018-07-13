import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  categories:any[] = ["Premium Cards","Close Up Magic","Intermediate Tricks","Beginner Tricks","Street Magic","Mentalism","Stage Magic","Accessories","Books"];
  bestSellers:any[]=["Huppin's","Popjens","Bicycle"]
}
