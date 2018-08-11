import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminComponent } from "./component/admin/admin.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { StringFilterPipe } from './shared/string-filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from "./component/login/login.component";


var routes = [{
  path:"",
  component:LoginComponent
},
{
  path:"admin",
  component:AdminComponent
}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StringFilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
