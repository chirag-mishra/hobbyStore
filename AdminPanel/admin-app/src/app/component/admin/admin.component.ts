import { Component } from "@angular/core";
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { StringFilterPipe } from '../../shared/string-filter.pipe';
import { AddProduct } from "../../shared/addProduct";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'
import { UpdatedProducts } from "../../shared/updatedProducts";
import { Router } from '@angular/router';
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
    categoryInputTags:any=[];
    incCategoryInputTag:number;
    inputTags:any=[];
    incInputTag:number
    addProduct: AddProduct;
    stock:number;
    obj_updatedProducts:Array<UpdatedProducts>;
    baseUrl:string;
    constructor(private toastr:ToastrService,public datepipe: DatePipe,private router:Router){
        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('userLoginDetails');
        if(retrievedObject== null || retrievedObject ==undefined){
            this.router.navigateByUrl("/");
        }
        this.addProduct={
          title:'',
          description:[],
          category:[],
          date:'',
          discount:0,
          stock:0,
          files:[],
          price:0,
          rating:0,
          genre:''
        }
        this.obj_updatedProducts=[];
        this.baseUrl="http://0abf7a5f.ngrok.io/";
        this.stock=0;
        this.incInputTag=0;
        this.inputTags.push(this.incInputTag);
        this.incCategoryInputTag = 0;
        this.categoryInputTags.push(this.incCategoryInputTag);
        var parent = this;
        fetch(parent.baseUrl+"products/magic")
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
            parent.productItems=(myJson);
            parent.productItems.forEach(item=>{
              parent.obj_updatedProducts.push({
                _id:item._id,
                title:item.title,
                price:item.price,
                oldStock:item.stock,
                newStock:0,
                discount:item.discount
              })
            })
        });
        this.qtyInput=1;
        
    }
    increaseQty(value:any){
        let changeProduct = this.obj_updatedProducts.filter(item=>item._id ==value);
        ++(changeProduct[0].newStock);
        this.updatedProducts(changeProduct[0]._id);
    }
    decreaseQty(value:any){
        let changeProduct = this.obj_updatedProducts.filter(item=>item._id ==value);
        changeProduct[0].newStock=(changeProduct[0].newStock)-1 < 0 ? 0 : --(changeProduct[0].newStock);
        this.updatedProducts(changeProduct[0]._id);
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
    let parent = this;
    let url = this.baseUrl+"updateExistingProducts";
    let bodyObject={'products':[]};
    this.updatedProductIds.forEach(id => {
        this.obj_updatedProducts.forEach(item=>item._id == id?bodyObject.products.push({
          _id:item._id,
          price:item.price,
          discount:item.discount,
          stock:item.newStock
        }):"");
      });
      console.log(bodyObject);
    if (bodyObject.products.length>0) {
      bodyObject = JSON.parse(JSON.stringify(bodyObject));
      console.log(JSON.stringify(bodyObject));
      fetch(url, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
      },
        body: JSON.stringify(bodyObject)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        parent.toastr.success('Products updated successfully!', '', {
          timeOut: 3000
        });
        location.reload();
      });
    }
    console.log(this.updatedProductItems);
      
  }
  updatedProducts(id: any) {
    if (!(this.updatedProductIds.indexOf(id) > -1))
      this.updatedProductIds.push(id);
  }
  increaseDescription(){
    ++this.incInputTag;
    this.inputTags.push(this.incInputTag);
  }
  increaseCategory(){
    ++this.incCategoryInputTag;
    this.categoryInputTags.push(this.incCategoryInputTag);
  }
  onChange(event: any) {
    this.addProduct.files=[];
    //console.log(event.target.files);
    let files = [].slice.call(event.target.files);
    this.addProduct.files=files;
  }
  addNewProduct(){
    this.addProduct.description=this.addProduct.description.filter(item=>item.trim()!="");
    this.addProduct.category=this.addProduct.category.filter(item=>item.trim()!="");
    this.addProduct.date=new Date().toLocaleDateString();
    //this.addProduct.date = this.addProduct.date
    
    //errors
    let errorList = [];
    if (this.addProduct.title.trim() == "")
      errorList.push('Title');
    if (this.addProduct.genre.trim() == "")
      errorList.push('Genre');
    if (this.addProduct.description.length == 0)
      errorList.push('Description');
    if (this.addProduct.category.length == 0)
      errorList.push('Category');
    if (this.addProduct.files.length == 0)
      errorList.push('Images');
    if (this.addProduct.price == 0 || this.addProduct.price == null)
      errorList.push('Price');
    if (this.addProduct.stock == 0 || this.addProduct.stock == null)
      errorList.push('Stock');
    if (errorList.length > 0) {
      for (let index = 0; index < errorList.length; index++) {
        switch (errorList[index]) {
          case "Title":
            this.toastr.error('Please fill up the title.', '', {
              timeOut: 3000
            });
            break;
          case "Genre":
            this.toastr.error('Please fill up the genre.', '', {
              timeOut: 3000
            });
            break;
          case "Description":
            this.toastr.error('Please fill up the description.', '', {
              timeOut: 3000
            });
            break;
          case "Category":
            this.toastr.error('Please fill up the category.', '', {
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
          case "Stock":
            this.toastr.error('Please fill up the stock.', '', {
              timeOut: 3000
            });
            break;
          default:
            break;
        }

      }
    }
    else{
      this.addProduct.description=this.addProduct.description.filter(item=>item.toLowerCase());
      this.addProduct.category=this.addProduct.category.filter(item=>item.toLowerCase());
      this.addProduct.title = this.addProduct.title.toLowerCase();
      this.addProduct.genre = this.addProduct.genre.toLowerCase();
      this.addProduct.date = this.datepipe.transform(this.addProduct.date, 'yyyy-MM-dd');
      console.log(this.addProduct);
      let newProduct = {"products":[]}
      newProduct.products.push(this.addProduct);
      var parent=this;
      let url = this.baseUrl+"addNewProducts";
      let bodyObject = JSON.parse(JSON.stringify(newProduct));
      fetch(url, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObject)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        parent.toastr.success('Products updated successfully!', '', {
          timeOut: 3000
        });
        location.reload();
      });
    }
    
  }
}