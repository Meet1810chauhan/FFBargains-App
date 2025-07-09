import { StackNavigationProp } from '@react-navigation/stack';
import { OrderDetailState } from '../../types/OrderHistory';

// Define the types for each screen
export type RootStackParamList = {
  OnBoarding: undefined;
  Login: { referralCode?: string };  // Make sure the next screen exists
 Home:  { referralCode?: string }; 
 Product:  { referralCode?: string }; 
 Cart:  { referralCode?: string }; 
 Profile:  { referralCode?: string }; 
 BottomNav:{ referralCode?: string };
 Setting:{ referralCode?: string };
 ViewAllProduct:{categories?: string };
//  ViewAllProduct:undefined;
ProductDetails:{productId:number}
EditProfile:{referralCode?: string}
OrderHistory:{referralCode?: string}
OrderDetails:{orderId?:number}
OrderReceipt:{OrderReceiptData?: OrderDetailState}
DeliveryAddress:{referralCode?: string}
AddressInfo:{adrressId?: string}
Payment:{referralCode?: string}
}

