// filepath: /c:/Users/jairg/OneDrive/Documentos/node-projects/alert-360/app/auth/auth-module.js
import constants from "expo-constants";
import { storeEmail, storePassword, storeToken, getEmail } from "./storage";

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
  if (value.hasOwnProperty("idToken")) {
    await storeToken(value.accessToken.jwtToken);
    await storeEmail(email);
    return true;
  }
  return false;
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
  const res = response.status >= 200 && response.status < 300;
  const value = await response.json();
  if (res) {
    await storeEmail(email);
    await storePassword(password);
  }
  return { res, value };
};

export const confirmEmail = async (verificationCode) => {
  const email = await getEmail();
  const response = await fetch(
    constants.expoConfig.extra["API_ENDPOINT"] + "/auth/confirmEmail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        verificationCode: verificationCode,
      }),
    }
  );
  const res = response.status >= 200 && response.status < 300;
  return res;
};

//*************UPDATE USER************** */
export const updateUser = async (id, name, phone, password) => {
  const response = await fetch(
    constants.expoConfig.extra["API_ENDPOINT"] + "/auth/register",
    {
      method: "PUT", // O "PATCH" si solo actualizas algunos campos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        password: password,
      }),
    }
  );

  const res = response.status >= 200 && response.status < 300;
  const value = await response.json();

  return { res, value };
};
