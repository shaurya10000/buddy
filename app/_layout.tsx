import React from 'react';
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function RootLayout() {
  // Show only sign in screen if no token is found in the app storage
  const { getItem } = useAsyncStorage("token");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getItem();
      const tokenData = JSON.parse(storedToken || '{}');
      if (!tokenData.token || tokenData.expiry < Date.now()) {
        return;
      }
      setIsSignedIn(true);
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
      <Stack>
        {/* <Stack.Screen name="(tabs1)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} /> */}
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
