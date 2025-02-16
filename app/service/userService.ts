import { getEmail, getToken, storeId, getId } from "../auth/storage";
import constants from "expo-constants";

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


export const updateUser = async (name: string, phone:string, password:string) => {
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
        password: password,
      }),
    }
  );
  const res = response.status >= 200 && response.status < 300;
  return { res};
};