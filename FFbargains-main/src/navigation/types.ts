import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for each screen
export type RootStackParamList = {
  OnBoarding: undefined;
  Login: { referralCode?: string };  // Make sure the next screen exists
 Home:  { referralCode?: string }; 
 Product:  { referralCode?: string }; 
 Cart:  { referralCode?: string }; 
 Profile:  { referralCode?: string }; 
 BottomNav:{ referralCode?: string }
}

