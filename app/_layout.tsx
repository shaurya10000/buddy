import React from 'react';
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function RootLayout() {
  const { getItem } = useAsyncStorage("token");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getItem();
      setIsSignedIn(!!storedToken);
    };
    
    checkToken();
  }, []);

  // If not signed in, only show sign-in screen
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

  // If signed in, show tabs and other screens
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
