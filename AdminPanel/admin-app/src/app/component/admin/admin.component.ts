import { Component } from "@angular/core";
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { StringFilterPipe } from '../../shared/string-filter.pipe';
import { AddProduct } from "../../shared/addProduct";
import { ToastrService } from 'ngx-toastr';
 
@Component({
    selector:"admin",
    templateUrl:"./admin.component.html",
    styleUrls:['./admin.component.css']
})

export class AdminComponent{
    qtyInput:number;
    pagedItems:any=[];
    productItems:any=[];
    updatedProductIds:any=[];
    updatedProductItems:any=[];
    filteredItems:any = [];
    groupedItems:any = [];
    itemsPerPage:number = 5;
    currentPage:number =0;
    gap:number=5;
    inputTags:any=[];
    incInputTag:number
    addProduct: AddProduct;
    constructor(private toastr:ToastrService){
        this.addProduct={
          title:'',
          description:[],
          date:'',
          discount:0,
          quantity:0,
          files:[],
          price:0,
          rating:0
        }
        this.incInputTag=0;
        this.inputTags.push(this.incInputTag);
        var parent = this;
        fetch('http://192.168.0.107:3000/products/magic')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
            parent.productItems=(myJson);
        });
        this.qtyInput=1;
        
    }
    increaseQty(value:any){
        ++(this.productItems[value].stock);
        this.updatedProducts(value);
    }
    decreaseQty(value:any){
        this.productItems[value].stock=(this.productItems[value].stock)-1 < 0 ? 0 : --(this.productItems[value].stock);
        this.updatedProducts(value);
    }
    //paging required inputs
    public filter: string = '';
    public maxSize: number = 7;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 8,
      currentPage: 1
    };
    
    public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
    };
    //onclick of page number in pagination
  onPageChange(number: number) {
    this.config.currentPage = number;
  }
  //onclick of 'item per page' options 
  totalItemPerPage : string = this.config.itemsPerPage.toString();
  onItemChange(item: any) {
    this.config.itemsPerPage = item == 'All' ? this.productItems.length : item;
    this.totalItemPerPage = item;
  }
  //onclick of submit
  updateProductDetails(){
    this.updatedProductItems=[];
    this.updatedProductIds.forEach(id => {
        this.updatedProductItems.push(this.productItems[id]);
      });
    if (this.updatedProductItems.length>0) {
      this.toastr.success('Products updated successfully!', '', {
        timeOut: 3000
      });
    }
      //console.log(this.updatedProductItems);
      
  }
  updatedProducts(id:any){
      if(!(this.updatedProductIds.indexOf(id)>-1)) 
        this.updatedProductIds.push(id);
  }
  increaseDescription(){
    ++this.incInputTag;
    this.inputTags.push(this.incInputTag);
  }
  onChange(event: any) {
    this.addProduct.files=[];
    //console.log(event.target.files);
    let files = [].slice.call(event.target.files);
    this.addProduct.files=files;
  }
  onChangeDescription(event:any){
    console.log(event.target.value);
    //this.addProduct.description.push(event.target.value)
    //console.log(this.addProduct.description);
  }
  addNewProduct(){
    this.addProduct.description=this.addProduct.description.filter(item=>item.trim()!="");
    this.addProduct.date=new Date().toLocaleDateString();
    //this.addProduct.date = this.addProduct.date
    
    //errors
    let errorList = [];
    if (this.addProduct.title.trim() == "")
      errorList.push('Title');
    if (this.addProduct.description.length == 0)
      errorList.push('Description');
    if (this.addProduct.files.length == 0)
      errorList.push('Images');
    if (this.addProduct.price == 0 || this.addProduct.price == null)
      errorList.push('Price');
    if (this.addProduct.quantity == 0 || this.addProduct.quantity == null)
      errorList.push('Quantity');
    if (errorList.length > 0) {
      for (let index = 0; index < errorList.length; index++) {
        switch (errorList[index]) {
          case "Title":
            this.toastr.error('Please fill up the title.', '', {
              timeOut: 3000
            });
            break;
          case "Description":
            this.toastr.error('Please fill up the description.', '', {
              timeOut: 3000
            });
            break;
          case "Images":
            this.toastr.error('Please add image to the product.', '', {
              timeOut: 3000
            });
            break;
          case "Price":
            this.toastr.error('Please fill up the price.', '', {
              timeOut: 3000
            });
            break;
          case "Quantity":
            this.toastr.error('Please fill up the quantity.', '', {
              timeOut: 3000
            });
            break;
          default:
            break;
        }

      }
    }
    else{
      console.log(this.addProduct);
      this.toastr.success('Product added successfully!', '', {
        timeOut: 3000
      });
    }
    
  }
}