// I am introducing this file so as to centrally configure the redux store and
// make it available to all the pages.

import { Provider } from 'react-redux';
import store from '@/redux/store';
import { Stack } from "expo-router";
import Index from '@/app/index';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }}>
                <Index />
            </Stack>
        </Provider>
    );
}