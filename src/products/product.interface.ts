export interface Products{
    id:number;
    title: string;
    description:string;
    price: number;
    rating: number;
    image:string[];
    category:string;
    subcategory:string;
    quantity:number;
    isActive:boolean;
    createdAt:Date;
}

export interface Querry{
    title?: string,
    limit:number, 
    skip:number,
    category?:string,
    subcategory?:string,
}