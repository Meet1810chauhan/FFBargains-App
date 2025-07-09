
export interface productDetails{
    id: number;
    title: string;
    main_image?: string;
    description: string;
    our_price: number;
    amazon_price: number;
    make_an_offer: number | undefined;
    images?: string
    weight?: string
    dimensions?:string
    brand?:string
    quantity?:number
}


export interface productArray{
    id: number;
    title: string;
    main_image: string;
    description: string;
    our_price: number;
    amazon_price: number;
    // make_an_offer: number | undefined;
    make_an_offer: number ;
    images?: string
    weight?: string
    dimensions?:string
    brand?:string

}

export interface AmountProduct {
  grand_total: number;
  discount?: number ;
  tax: number;
  tax_exempt: number;
  gift_card: number;
  payable_amount?: number;
}

 export type AmountSta = {
  grand_total?: number;
  discount?: number;
  tax: number;
  tax_exempt: number;
  gift_card: number;
  payable_amount?: number;
};


export interface ProductDetail{
    id: number;
    title: string;
    main_image: string;
    description: string;
    our_price: number;
    amazon_price: number 
    // make_an_offer: number | undefined;
    make_an_offer?: number;
    images: string[];
    weight: string
    dimensions:string | undefined
    brand:string;
    features:string[];
    status: string;
    sizes:string[] 
    quantity:number
    product?:string[]
}

export interface CustomeCardProductDetails {
    leftHeaderText?: string;
    rightButtonText?: string;
    imageRightButton?: object;
    horizontalScroll?: boolean;
    onPressProductList?: (() => void) | null;
    dataofArray?: Array<productArray> | null;
  }

  export interface cardProductList{
    id?: number;
    title?: string;
    main_image?: string;
    description?: string;
    our_price?: number;
    amazon_price?: number;
    make_an_offer?: number | undefined;
    images?: string
    weight?: string
    dimensions?:string
    brand?:string
}


export interface ShippingAndRecivers {
  name: string;
  imageButton: object;
  selectOption?: string;
  onSelect?: () => void;
}

export interface PriceDetailNames {
  title: string;
  price?: number | string;
  titleStyle?: object;
  priceStyle?: object;
}

 export type addressState = {
    id?: string;
    name: string;
    street_address: string;
    city: string;
    state: string;
    zipcode: number;
    created_at: number;
    phone_number: number;
    country_code: number;
    country: string;
    country_iso: string;
  };