import axios, { AxiosRequestConfig } from "axios";
import showCustomToast from "../component/CustomeToast";
import Constant from "../theme/Constant";

interface ApiCallProps {
  apilasturlname: string;
  access_token?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  bodyRequest?: object;
  params?: Record<string, any>; // Use Record for flexible params
  inventory_id?: number;
  quantity?: number;
}

const ApiServicesAxios = async ({
  apilasturlname,
  access_token,
  method = "POST",
  bodyRequest,
  params, // Include params
}: ApiCallProps) => {
  try {
    const url = `${Constant.BaseUrl}${apilasturlname}`;
    console.log("url axios", url);
    console.log("Body para-----axios", JSON.stringify(bodyRequest));
    console.log("Params-----axios", JSON.stringify(params)); // Log params

    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Api-Token": "dgWpK93qKPPAqG8dVD4xreteLMfjjr",
        Authorization: `Bearer ${access_token}`,
      },
      data: bodyRequest,
      params: params, // Pass params to axios
    };

    const response = await axios(config);

    if (response.data.result === false) {
      throw new Error("Error--");
    }

    return response.data;
  } catch (error: any) {
    console.error("API Call Error:", error);
    showCustomToast({
      type: "error",
      text1: "API Error",
      text2: error.message || "An unexpected error occurred.",
    });
    throw error;
  }
};

export default ApiServicesAxios;
