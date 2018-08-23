export class UpdatedProducts{
    constructor(
        public _id:string,
        public title:string,
        public oldStock:number,
        public newStock:number,
        public price:number,
        public discount:number,
    ){
    }
}