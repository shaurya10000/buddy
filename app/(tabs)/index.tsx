import { StyleSheet } from "react-native";
import { inputText as UserInput } from '@/components/UserInput';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProjectsViewHomePage from "@/components/ProjectsHomePage";

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ProjectsViewHomePage/>
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