import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

export interface EdittableRichTextBox1NoBoundaryProps {
    displayText: string,
    style?: any,
    textInputProps?: any,
    multiline?: boolean,
    maxLength?: number,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
}

export function EdittableRichTextBox1NoBoundary(props: EdittableRichTextBox1NoBoundaryProps) {
    const [text, setText] = useState(props.displayText);
    return (
        <View style={[styles.projectTasksViewTitleWindowContainer, props.style]} testID={props.testID ?? "75:860"}>
            <TextInput 
                style={[styles.textBox, props.textInputProps]} 
                testID="75:859" 
                value={text} 
                onChangeText={(inputText) => {
                    if (!props.maxLength || inputText.length <= props.maxLength) {
                        setText(inputText);
                    }
                }}
                multiline={props.multiline ?? false}
                maxLength={props.textInputProps?.maxLength}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    projectTasksViewTitleWindowContainer: {
        width: '100%',
        backgroundColor: 'offwhite',
        borderWidth: 1,
    },
    textBox: {
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },

});
