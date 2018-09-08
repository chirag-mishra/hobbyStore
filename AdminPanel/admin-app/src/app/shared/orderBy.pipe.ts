import { Pipe } from "@angular/core";


@Pipe({
    name: 'orderBy'
})
export class OrderByPipe {
    transform(array, orderBy, asc = true) {

        if (!orderBy || orderBy.trim() == "") {
            return array;
        }
        if (orderBy == "rating") {
            if (asc) {
                return Array.from(array).sort((item1: any, item2: any) => {
                    return this.orderByComparator(item1[orderBy], item2[orderBy]);
                });
            }
            else {
                //not asc
                return Array.from(array).sort((item1: any, item2: any) => {
                    return this.orderByComparator(item2[orderBy], item1[orderBy]);
                });
            }
        }
        else if(orderBy == "date"){
            array.sort((a: any, b: any) => {
                let left = Number(new Date(a[orderBy]));
                let right = Number(new Date(b[orderBy]));
                return (asc) ? left - right : right - left;
            });
            return array;
        }
    }
    orderByComparator(a: any, b: any): number {

        if (parseFloat(a) < parseFloat(b)) return -1;
        if (parseFloat(a) > parseFloat(b)) return 1;

        return 0;
    }
}