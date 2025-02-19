import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '@/config/storageKeys';
import { router } from 'expo-router';

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem(storageKeys.token);
    console.log('User signed out');
    router.replace('/sign-in'); // Redirect to sign-in screen
  } catch (error) {
    console.error('Error signing out:', error);
  }
};