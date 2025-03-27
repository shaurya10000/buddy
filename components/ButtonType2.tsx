import { View, Text, StyleSheet } from 'react-native';

export interface ButtonType2Props {
    displayText: string,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
}

export function ButtonType2(props: ButtonType2Props) {

    return (
        <View style={styles.buttonContainer} testID={props.testID ?? "71:65"}>
            <Text style={styles.addNote} testID="70:241">
                {props.displayText}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: 95,
        height: 28,
        paddingTop: 6,
        paddingLeft: 20,
        paddingBottom: 7,
        paddingRight: 21,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    addNote: {
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});
