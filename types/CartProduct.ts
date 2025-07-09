export interface CartProdDetailsState {
    id?: number;
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
    location:string
    flash_sale:number
    // rate:number
    // success:boolean
    // message:null
}

export interface CartProState{
    id?:number
    product:CartProdDetailsState
    quantity:number
    size?: null,
    color?: null
    rate: number;
    success: boolean;
    message: string;
}

 export type amountState = {
    grand_total: number;
    discount?: number;
    tax: number;
    tax_exempt: number;
    gift_card: number;
    payable_amount?: number;
  };

export type productsItem ={
    id:number;
    product:CartProdDetailsState
    quantity: number,
    size: null,
    color: null,
    rate: number;
    success: boolean;
    message: string;
    total:number
}
  export type CartDataState={
    amounts:amountState ;
    products:productsItem[];
  }

export type ShipmentData  ={
    inventory_id:number | string,
    shipment_id: number | string,
    rate_id: number | string,
    service: string,
    carrier: string,
    rate: number,
    currency:string  ,
    est_delivery_days: number,
    success: boolean,
    message: null,
    is_free_shipping: boolean,
    free_shipping_rate:number ,
}

export type DeliveryShippingState={
    shipments:ShipmentData[],
    total:number,
}