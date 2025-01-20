import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import BuddyButton from '@/components/BuddyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import { AuthSessionResult } from 'expo-auth-session';

const [userInfo, setUserInfo] = useState(null);

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
        setUserInfo(user);
    } catch (error) {
        console.error(
            "Failed to fetch user data:",
            response?.status,
            response?.statusText
        );
    }
};

const signInWithGoogle = async (response: AuthSessionResult | null) => {
    try {
        const userJSON = await AsyncStorage.getItem("user");

        if (userJSON) {
            // If user information is found in AsyncStorage, parse it and set it in the state
            setUserInfo(JSON.parse(userJSON));
        } else if (response?.type === "success") {
            // If no user information is found and the response type is "success" (assuming response is defined),
            // call getUserInfo with the access token from the response
            await getUserInfo(response?.authentication?.accessToken);
        }
    } catch (error) {
        // Handle any errors that occur during AsyncStorage retrieval or other operations
        console.error("Error retrieving user data from AsyncStorage:", error);
    }
};

const signInExperience = () => {
    //client IDs from .env
    const config = {
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
    };

    const [request, response, promptAsync] = Google.useAuthRequest(config);

    //add it to a useEffect with response as a dependency 
    useEffect(() => {
        signInWithGoogle(response);
    }, [response]);

    //log the userInfo to see user details
    console.log(JSON.stringify(userInfo))

    return (
        <View style={{ padding: 10 }}>
            {/* <BuddyButton theme="buddy" label="sign in with google" inputType='' onPress={submitUserInputText} /> */}
            <Text>{JSON.stringify(userInfo, null, 2)}</Text>
            <Button title="sign in with google" onPress={() => { promptAsync() }} />
        </View>
    );
};

export {
    signInExperience,
    setUserInfo,
};
