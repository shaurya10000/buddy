import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import * as Google from "expo-auth-session/providers/google";
import { AuthSessionResult } from 'expo-auth-session';
import { Text, Button, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { populateLocalStorageFromServer } from "../upstreams/fetch";


WebBrowser.maybeCompleteAuthSession();

//client IDs from .env
const config = {
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
};

// console.log(`WEB_CLIENT_ID: ${config.webClientId}`);

export default function SignIn() {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    // wipe out everything if user wants to sign-in (ideally would be done on sign-out) except some cookies possibly

    const signInWithGoogle = async (response: AuthSessionResult | null) => {
        try {
            AsyncStorage.clear();
            const userJSON = await AsyncStorage.getItem("user");
    
            if (response?.type === "success") {
                // If the response type is "success" (assuming response is defined),
                // call getUserInfo with the access token from the response
                await getUserInfo(response?.authentication?.accessToken);
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage retrieval or other operations
            console.error("Error retrieving user data from AsyncStorage:", error);
        }
    };

    useEffect(() => {
        signInWithGoogle(response);
    }, [response]);

    const getUserInfo = async (token: string | undefined) => {
        //absent token
        if (!token) return;
        //present token
        let response: Response | null = null;
        try {
            response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const user = await response.json();
            //store user information  in Asyncstorage
            await AsyncStorage.setItem("user", JSON.stringify(user));
            await AsyncStorage.setItem("access_token_type", 'google'); // for later use
            await AsyncStorage.setItem("access_token", token);
            setUserInfo(user);
            
            // similarly fetch other items
            populateLocalStorageFromServer();
        } catch (error) {
            console.error(
                "Failed to fetch user data:",
                response?.status,
                response?.statusText
            );
        }
    };

    //log the userInfo to see user details
    console.log(JSON.stringify(userInfo))

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={{ padding: 10 }}>
                {/* <BuddyButton theme="buddy" label="sign in with google" inputType='' onPress={submitUserInputText} /> */}
                <Text>{JSON.stringify(userInfo, null, 2)}</Text>
                <Button title="sign in with google" onPress={() => { promptAsync() }} />
            </View>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 28,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
