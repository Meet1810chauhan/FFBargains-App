interface ApiCallProps {
  apilasturlname: string;
  idToken: string;
}

const ApiComponent = async ({ apilasturlname, idToken }: ApiCallProps) => {
  try {
    const response = await fetch(
      `https://sandbox.fandfbargains.com/apia/${apilasturlname}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);

    return json;
  } catch (error) {
    console.error("API Call Error:", error);
    return null;
  }
};

export default ApiComponent;
