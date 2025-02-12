// filepath: /c:/Users/jairg/OneDrive/Documentos/node-projects/alert-360/app/auth/token-storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "jwt_token";
const EMAIL_KEY = "user_email";
const PASSWORD_KEY = "user_password";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving the token", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing the token", error);
  }
};

export const storeEmail = async (email) => {
  try {
    await AsyncStorage.setItem(EMAIL_KEY, email);
  } catch (error) {
    console.error("Error storing the email", error);
  }
};

export const getEmail = async () => {
  try {
    return await AsyncStorage.getItem(EMAIL_KEY);
  } catch (error) {
    console.error("Error retrieving the email", error);
    return null;
  }
};

export const storePassword = async (password) => {
  try {
    await AsyncStorage.setItem(PASSWORD_KEY, password);
  } catch (error) {
    console.error("Error storing the password", error);
  }
};

export const getPassword = async () => {
  try {
    return await AsyncStorage.getItem(PASSWORD_KEY);
  } catch (error) {
    console.error("Error retrieving the password", error);
    return null;
  }
};

export const removePassword = async () => {
  try {
    await AsyncStorage.removeItem(PASSWORD_KEY);
  } catch (error) {
    console.error("Error removing the password", error);
  }
};
