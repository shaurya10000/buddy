import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from 'react';
import { signInExperience as UserSignIn, setUserInfo } from '@/components/UserSignIn';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <UserSignIn />
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
