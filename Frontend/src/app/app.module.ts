import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { SliderComponent } from './components/slider/slider.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';

import { ProductsComponent } from './components/products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StringFilterPipe } from './shared/string-filter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { HomeComponent } from "./components/home/home.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { NgxTypeaheadModule } from 'ngx-typeahead';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ModalPopupComponent,
    ToolbarComponent,
    ProductsComponent,
    StringFilterPipe,
    HomeComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    OrderModule,
    RouterModule,
    NgxTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*learning*/