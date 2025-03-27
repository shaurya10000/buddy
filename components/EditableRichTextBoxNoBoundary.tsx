import { View, Text, StyleSheet } from 'react-native';

export interface EdittableRichTextBox1NoBoundaryProps {
    displayText: string,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
}

export function EdittableRichTextBox1NoBoundary(props: EdittableRichTextBox1NoBoundaryProps) {

    return (
        <View style={styles.projectTasksViewTitleWindowContainer} testID={props.testID ?? "75:860"}>
            <Text style={styles.textBox} testID="75:859">
                {props.displayText}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    projectTasksViewTitleWindowContainer: {
        flexDirection: 'row',
        width: 640,
        maxWidth: 640,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10,
    },
    textBox: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});
