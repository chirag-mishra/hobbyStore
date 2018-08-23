export class AddProduct{
    constructor(
        public title:string,
        public description:Array<string>,
        public files:Array<string>,
        public rating:number,
        public stock:number,
        public price:number,
        public discount:number,
        public date:string,
        public genre:string,
        public category:Array<string>
    ){
    }
}