import React from 'react';
import { router, Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { storageKeys } from '@/config/storageKeys';
import { signOut } from '@/app/sign-out';
import { Button } from 'react-native';

export default function RootLayout() {
  // Show only sign in screen if no token is found in the app storage
  // const { getItem } = useAsyncStorage("token");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem(storageKeys.token);
      console.log("storedToken", storedToken);
      try {
        const tokenData = JSON.parse(storedToken || '{}');
        if (!tokenData.token || tokenData.expiry < Date.now()) {
          return;
        }
        setIsSignedIn(true);
      } catch (error) {
        console.error("Error parsing token", error);
        await AsyncStorage.removeItem(storageKeys.token);
        console.log("token removed");
        console.log('Redirecting to sign-in');
        return;
      }
    };
    
    checkToken();
  }, []);

  if (!isSignedIn) {
    return (
      <>
        <Stack>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </>
    );
  }
  return (
    <>
      <Stack
        screenOptions={({ route }) => ({
          headerRight: () => (
            route.name !== 'sign-in' && (
              <Button
                onPress={signOut}
                title="Sign Out"
                color="transparent"
              />
            )
          ),
          headerStyle: {
            backgroundColor: '#25292e',
          },
          headerTintColor: '#fff',
        })}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
