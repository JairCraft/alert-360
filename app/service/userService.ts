import { getEmail, getToken, storeId, getId, getPassword, getName, getPhone, getFcmToken, storeName } from "../auth/storage";
import constants from "expo-constants";
import * as Location from 'expo-location';

export const getUser = async () => {
  const response = await fetch(
    (constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/users/" + (await getEmail()),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getToken()),
      },
    }
  );
  const userData: { email: string, id: number, name: string, password: string, phone: string, registry_date: string } = await response.json()
  await storeId(userData.id)
  await storeName(userData.name)
  return { ...userData };
};

export const getProfileByUser = async (userName: string) => {
  return await fetch(
    "https://avatar.iran.liara.run/public/boy?username=" + userName,
    {
      method: "GET"
    }
  );
}


export const updateUser = async (name: string, phone: string, password: string) => {
  const response = await fetch(
    (constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/users",
    {
      method: "PUT", // O "PATCH" si solo actualizas algunos campos
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getToken()),
      },
      body: JSON.stringify({
        id: parseInt(await getId() ?? "0"),
        name: name,
        email: await getEmail(),
        phone: phone,
        password: await getPassword(),
      }),
    }
  );
  const res = response.status >= 200 && response.status < 300;
  return { res };
};

export const updatePass = async (name: string, phone: string, password: string) => {
  const response = await fetch(
    (constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/users",
    {
      method: "PUT", // O "PATCH" si solo actualizas algunos campos
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getToken()),
      },
      body: JSON.stringify({
        id: parseInt(await getId() ?? "0"),
        password: password,
        name: name,
        email: await getEmail() ?? "",
        phone: phone,
      }),
    }
  );
  const res = response.status >= 200 && response.status < 300;
  return { res };
};

export const saveContact = async (email: string, relation: string) => {
  const response = await fetch(
    (constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/contacts",
    {
      method: "POST", // O "PATCH" si solo actualizas algunos campos
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getToken()),
      },
      body: JSON.stringify({
        user_id: parseInt(await getId() ?? "0"),
        relation: relation,
        contact_email: email
      }),
    }
  );
  const res = response.status >= 200 && response.status < 300;
  return { res };
};

export const sendNotification = async () => {
  const response = await fetch((constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/send-notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getToken())
    },
    body: JSON.stringify({
      user_id: parseInt(await getId() ?? "0"),
      title: "Alerta de emergencia",
      body: await getName() + " puede necesitar tu ayuda.",
      location: {
        lat: (await Location.getCurrentPositionAsync({})).coords.latitude,
        lon: (await Location.getCurrentPositionAsync({})).coords.longitude
      }
    }),
  });

  const result = await response.json();
  return result
}

export const saveDeviceFcmToken = async () => {
  const response = await fetch((constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/devices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getToken()),
    },
    body: JSON.stringify({
      user_id: parseInt(await getId() ?? "0"),
      device_id: await getFcmToken(),
    }),
  });

  const result = await response.json();
  return result
}