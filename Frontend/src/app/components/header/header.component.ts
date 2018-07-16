import { Component } from '@angular/core';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {
  @Output() searchInput = new EventEmitter<string>();

  title:string="HobbyBridge";
  categories:any[] = ["Premium Cards","Close Up Magic","Intermediate Tricks","Beginner Tricks","Street Magic","Mentalism","Stage Magic","Accessories","Books"];
  bestSellers:any[]=["Huppin's","Popjens","Bicycle"];

  onSearchText(searchText:string)
{
  this.searchInput.emit(searchText);
}
}

