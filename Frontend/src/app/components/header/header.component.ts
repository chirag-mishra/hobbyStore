import { Component } from '@angular/core';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title:string="HobbyBridge";
  categories:any[] = ["Premium Cards","Close Up Magic","Intermediate Tricks","Beginner Tricks","Street Magic","Mentalism","Stage Magic","Accessories","Books"];
  bestSellers:any[]=["Huppin's","Popjens","Bicycle"]
}
