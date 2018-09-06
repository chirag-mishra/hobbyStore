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
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

import { CartsharedService } from './shared/cartsharedservice/cartshared.service';
import { OrdersComponent } from "./components/orders/orders.component";
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { AboutComponent } from "./components/about/about.component";
import { DatePipe } from '@angular/common';
import { NewProductsComponent } from "./components/new-products/new-products.component";
var routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "products/:category/:id",
  component: ProductDetailComponent
},
{
  path: "cart",
  component: CartDetailsComponent
},
{
  path:"orders",
  component:OrdersComponent
}
];

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
    CartDetailsComponent,
    HomeComponent,
    ProductDetailComponent,
    OrdersComponent,
    AboutComponent,
    NewProductsComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    OrderModule,
    RouterModule.forRoot(routes), 
    NgxTypeaheadModule
  ],
  providers: [CartsharedService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*learning*/