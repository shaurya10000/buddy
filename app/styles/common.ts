// Common styles for the app
// Place button at the bottom of the container
import { ViewStyle } from 'react-native';

export const bottomFullWidthPlacement: ViewStyle = {
    marginTop: 'auto',
    bottom: 0,
    left: 0,
    width: '100%'
};

export const bottomHalfWidthPlacement: ViewStyle = {
    flex: 1,
    display: 'flex',
    minWidth: '48%'
};

export const fullPageContainer: ViewStyle = {
    flex: 1,
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "column",
};

export const secondButtonFromBottom = (bottomButton: ViewStyle) => {
    return {
        ...bottomFullWidthPlacement,
        bottom: (bottomButton.bottom ?? 0) - (bottomButton.height ?? 0),
    };
};  