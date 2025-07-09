// import { useAppSelector } from "../redux/hooks";
// import ApiServices from "./ApiServices";
// const userAccessToken = useAppSelector((state) => state.user.access_token);

// export const getDeliveryAmountApi = async (d: {
//   ids: string[];
//   offer: "0";
// }): Promise<any> => {
//   try {
//     const queryString = `ids=${d.ids.join(",")}&offer=${d.offer}`;

//     const response = await ApiServices({
//       method: "GET",
//       apilasturlname: `order/calculate/shipping?${queryString}`,
//       access_token: userAccessToken,
//     });

//     return response;
//   } catch (error) {
//     console.error("Error in getDeliveryAmountApi:", error);
//     throw error;
//   }
// };
