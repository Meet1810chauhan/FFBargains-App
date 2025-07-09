import { CartProdDetailsState, productsItem, ShipmentData } from "./CartProduct"
import { addressState, ProductDetail } from "./ProductState"

export interface OrderHistoryItemState {
    id:number 
    order_date: string,
    status: string
    status_updated_date: number | string
    image: string
    approved_items_count:number
    rejected_items_count:number
    refunded:number
    refunded_amount:number
    created_at: number | string
    items_count?:number
}

export interface OrderItemState {
    data:OrderHistoryItemState
    
}

export type OrderData ={
            status: string,
            delivery_type: string,
            pickup_location: null,
            street_address: string,
            street_address_2: null,
            city?: string,
            state?: string,
            zipcode?: number,
            country?: string | number,
            phone_number: number,
            country_code?:number,
            total_mrp?: number,
            discount?: number,
            delivery_fee: number,
            total_amount?: number,
            tax?: number,
            tax_exempt?: number,
            gift_card?:number,
            payment_status: string,
            payment_type: string,
            refunded:number,
            refunded_amount: number,
            image:string
            inventories:productsItem[]
            make_an_offer:boolean
            shipments?:ShipmentData
}

export type OrderProductDetails ={
    // order_data:orderData,
    id:number | string,
    order_id:number | string,
    product:ProductDetail,
    status: string
    reason_of_rejection: null,
    quantity: number,
    color: null,
    size: null,
    ordered_store_price: string
    ordered_our_price: string 
    tracking_url: null,
    shipment_status: null,
    est_delivery_days: null,
    est_delivery_date: null,
    shipment_updated_date: null,
    payment_status: string,
    refunded: 0,
    refunded_amount: 0
}

export type OrderDetailState ={
    order_data:OrderData,
    order_items:OrderProductDetails[],
}

export type addressData ={
    current_page: number
    data:addressState[]
}




type InventoryItem1 = {
    color?: string;
    inventory_id: string;
    ordered_our_price: string;
    ordered_store_price: number;
    quantity: number;
    size?: string | null;
    coupon?: string | null;
  };
  
  type Shipment1 = {
    inventory_id: string;
    shipment_id: string;
    rate_id: string;
    service: string;
    carrier: string;
    rate: string;
  };
  
 export type OrderData1 = {
    country_code: string;
    delivery_fee: number;
    delivery_type: "delivery" | "pickup";
    discount: number;
    image?: string;
    inventories: InventoryItem1[];
    make_an_offer: boolean;
    phone_number: string | number;
    pickup_location_id?: string;
    total_amount: number;
    total_mrp: number;
    tax: number;
    tax_exempt: number;
    gift_card: number;
    street_address?: string;
    street_address_2?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    shipment_id?: string;
    rate_id?: string;
    carrier?: string;
    service?: string;
    shipments?: Shipment1[];
    payment_type: "cash_on_pickup" | "pre_paid";
  };
  