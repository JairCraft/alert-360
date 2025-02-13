import { getEmail, getToken } from "../auth/storage";
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
