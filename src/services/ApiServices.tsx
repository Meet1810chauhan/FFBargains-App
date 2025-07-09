import { firebase } from "@react-native-firebase/auth";
import showCustomToast from "../component/CustomeToast";
import Constant from "../theme/Constant";
import { useAppSelector } from "../redux/hooks";

// const userAccessToken = useAppSelector((state) => state.user.access_token);

interface ApiCallProps {
  apilasturlname: string;
  // idToken?: string;
  access_token?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  bodyRequest?: object;
  params?: null;
  inventory_id?: number;
  quantity?: number;
}

const ApiServices = async ({
  apilasturlname,

  access_token,
  method = "POST",
  bodyRequest,
}: // inventory_id,
// quantity,
ApiCallProps) => {
  try {
    console.log(
      "url",
      `https://sandbox.fandfbargains.com/api/${apilasturlname}`
    );
    // console.log(
    //   // "Headers -----",
    //   // "Content-Type :application/json",
    //   // "X-Api-Token   : dgWpK93qKPPAqG8dVD4xreteLMfjjr",
    //   // "Authorization:",
    //   // `Bearer ${access_token}`
    //   // `AccessToken Checking: ${access_token}`
    // );

    console.log("Body para-----", JSON.stringify(bodyRequest));

    const url = `${Constant.BaseUrl}${apilasturlname}`;
    console.log(url);

    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Api-Token": "dgWpK93qKPPAqG8dVD4xreteLMfjjr",
        Authorization: `Bearer ${access_token}`,
      },
      // body: JSON.stringify({
      //   firebase_token: idToken,
      //   push_token: "dummy",
      // }),

      body: JSON.stringify(bodyRequest),
    });

    // console.log("Response user   data :", response);
    // console.log("BodyRequaste --- --- --- --- -- - -:", bodyRequest);

    const json = await response.json();
    // console.log("Response dat ---- ", json);

    if (json.result == false) {
      throw new Error("Error--");
    }

    return json;
  } catch (error: any) {
    // console.error("API Call Error:", error);
    showCustomToast({
      type: "error",
      text1: "API Error",
      text2: error.messeage,
    });
    throw new Error(error);
  }
};

export default ApiServices;
