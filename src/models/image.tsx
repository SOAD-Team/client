export class Image{
    constructor(
        public id?: number,
        public objectImage: any = null
    ){ }
    
    public static get Empty(): Image{return new Image()};
}