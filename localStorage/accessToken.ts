import { storageKeys } from "@/config/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get access token from local storage
export const getAccessToken = async () => {
    const tokenData = await AsyncStorage.getItem(storageKeys.token);
    const accessToken = JSON.parse(tokenData || '{}').token;
    const expirationTime = JSON.parse(tokenData || '{}').expirationTime;
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
        await AsyncStorage.removeItem(storageKeys.token);
        return null;
    }
    return accessToken;
};

export const isAccessTokenValid = async (): Promise<boolean> => {
    try {
      const accessTokenWithExpiry = await AsyncStorage.getItem(storageKeys.token);
      const accessToken = JSON.parse(accessTokenWithExpiry || '{}')[storageKeys.accessToken];
      const expiryTime = JSON.parse(accessTokenWithExpiry || '{}')[storageKeys.tokenExpiry];

      if (!accessToken || !expiryTime) {
        return false;
      }

      const now = Date.now();
      if (now > parseInt(expiryTime, 10)) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking access token:', error);
      return false;
    }
  };