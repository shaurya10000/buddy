import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProjectsViewHomePage from '@/app/pages/ProjectsHomePage';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from "@/config/storageKeys";

export default function Index() {
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessTokenWithExpiry = await AsyncStorage.getItem(storageKeys.token);
        const accessToken = JSON.parse(accessTokenWithExpiry || '{}').accessToken;
        const expiryTime = JSON.parse(accessTokenWithExpiry || '{}').expiryTime;

        if (!accessToken || !expiryTime) {
          router.replace('/sign-in'); // Redirect if no token or expiry
          return;
        }

        const now = Date.now();
        if (now > parseInt(expiryTime, 10)) {
          router.replace('/sign-in'); // Redirect if token is expired
          return;
        }

        // Token is present and not expired, continue
      } catch (error) {
        console.error('Error checking access token:', error);
        router.replace('/sign-in'); // Redirect on error
      }
    };

    checkAccessToken();
  }, [router]);
  
  return (
    <GestureHandlerRootView style={styles.container}>

      <ProjectsViewHomePage />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});