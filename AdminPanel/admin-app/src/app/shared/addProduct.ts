export class AddProduct{
    constructor(
        public title:string,
        public description:Array<string>,
        public files:Array<string>,
        public rating:number,
        public quantity:number,
        public price:number,
        public discount:number,
        public date:string
    ){
    }
}