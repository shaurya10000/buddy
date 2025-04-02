import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProjectsViewHomePage from '@/app/pages/ProjectsHomePage';
import { router } from "expo-router";
import { isAccessTokenValid } from "@/localStorage/accessToken";

export default function Index() {
  useEffect(() => {
    isAccessTokenValid().then((isValid) => {
      if (!isValid) {
        router.replace('/sign-in');
      }
    });
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