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

