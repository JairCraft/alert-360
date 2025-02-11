import constants from "expo-constants";

let thisEmail = "";

export const loginUser = async (email, password) => {
  const response = await fetch(
    constants.expoConfig.extra["API_ENDPOINT"] + "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );

  const value = await response.json();
  return value.hasOwnProperty("accessToken");
};

export const registerUser = async (name, email, password, phone) => {
  const response = await fetch(
    constants.expoConfig.extra["API_ENDPOINT"] + "/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    }
  );
  const res = response.status >= 200 || response.status < 300 ? true : false;
  const value = await response.json();
  thisEmail = email;
  return { res, value };
};

export const confirmEmail = async (verificationCode) => {
  const response = await fetch(
    constants.expoConfig.extra["API_ENDPOINT"] + "/auth/confirmEmail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: thisEmail,
        verificationCode: verificationCode,
      }),
    }
  );
  const res = response.status >= 200 || response.status < 300 ? true : false;
  return res;
};
