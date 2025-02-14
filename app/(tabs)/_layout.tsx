import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { storageKeys } from '@/config/storageKeys';

export default function TabLayout() {
  const { getItem: getToken } = useAsyncStorage(storageKeys.token);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const tokenData = JSON.parse(token || '{}');
      if (!tokenData.token || tokenData.expiry < Date.now()) {
        // Redirect to sign-in if no token is found
        console.log('Redirecting to sign-in');
        router.replace("/sign-in");
      }
    };

    checkAuth();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          title:'',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarLabel: 'Tasks',
          title:'',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'timer-sharp' : 'timer-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          tabBarLabel: 'Reminders',
          title:'',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'timer-sharp' : 'timer-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          tabBarLabel: 'Grocery',
          title:'',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list-sharp' : 'list-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarLabel: 'About',
          title:'',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}