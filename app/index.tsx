import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProjectsViewHomePage from '@/app/pages/ProjectsHomePage';

export default function Index() {
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