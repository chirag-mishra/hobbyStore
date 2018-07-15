import {Pipe} from "@angular/core";
import { Product } from "./../shared/product";
@Pipe({
    name: 'stringFilter'
})
export class StringFilterPipe {

    transform(value: Product[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.title.toLowerCase().indexOf(q.toLowerCase()));
    }
    // transform(items: Product[], filter: Product): Product[] {
    //     console.log(Product,'hey',items);
    //     if (!items || !filter || filter == undefined) {
    //       return items;
    //     }
    //     // filter items array, items which match and return true will be kept, false will be filtered out
    //     return items.filter((item: Product) => this.applyFilter(item, filter));
    //   }
      
    //   applyFilter(product: Product, filter: Product): boolean {
    //     for (let field in filter) {
    //       if (filter[field]) {
    //         if (typeof filter[field] === 'string') {
    //           if (product[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
    //             return false;
    //           }
    //         } else if (typeof filter[field] === 'number') {
    //           if (product[field] !== filter[field]) {
    //             return false;
    //           }
    //         }
    //       }
    //     }
    //     return true;
    //   }
}