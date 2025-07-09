import { addressState } from "./ProductState";

export interface UserDatas {
    id: string;
    name: string;
    email: string;
    profile_image: string;
    country_code: number ;
    country_iso: string;
    contact_number: number;
    // address: Useraddress | null;
    address: addressState | null;
    access_token: string;
    default_delivery_method:string;
  pickup_location_id:null;
  stripe_customer_id:string;
  stripe_payment_id:null;
  is_offline_user:number;
}

export interface Useraddress{
    id: string,
    name: string
    street_address: string,
    city:string,
    state:string,
    zipcode:number,
    phone_number:number,
    country_code:number,
    country:string,
    country_iso:string
}

export interface UserState{

  UserData: UserDatas | null ;
  
}