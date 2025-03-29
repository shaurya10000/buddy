// Common styles for the app
// Place button at the bottom of the container
import { ViewStyle } from 'react-native';

export const buttonAtBottom: ViewStyle = {
    marginTop: 'auto',
    bottom: 0,
    left: 0,
    width: '100%'
};

export const fullPageContainer: ViewStyle = {
    flex: 1,
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    flexWrap: "wrap",
};