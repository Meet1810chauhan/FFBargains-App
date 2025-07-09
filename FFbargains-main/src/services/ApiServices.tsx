import { firebase } from "@react-native-firebase/auth";

interface ApiCallProps {
  apilasturlname: string;
  idToken: string;
}

const ApiServices = async ({ apilasturlname, idToken }: ApiCallProps) => {
  try {
    console.log(
      "url",
      `https://sandbox.fandfbargains.com/api/${apilasturlname}`
    );

    const response = await fetch(
      `https://sandbox.fandfbargains.com/api/${apilasturlname}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          firebase_token: idToken,
          push_token: "dummy",
        }),
      }
    );
    console.log(response);

    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error("API Call Error:", error);
    return null;
  }
};

export default ApiServices;
