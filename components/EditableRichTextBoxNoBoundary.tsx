import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

export interface EdittableRichTextBox1NoBoundaryProps {
    style?: any,
    textInputProps?: any,
    multiline?: boolean,
    maxLength?: number,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
}

export function EdittableRichTextBox1NoBoundary(props: EdittableRichTextBox1NoBoundaryProps) {
    const initialText = props.textInputProps.initialValue;
    return (
        <View style={[styles.projectTasksViewTitleWindowContainer, props.style]} testID={props.testID ?? "75:860"}>
            <TextInput
                style={[styles.textBox, props.textInputProps.styles]}
                testID="75:859"
                value={props.textInputProps.value}
                onChangeText={(inputText) => {
                    if (!props.textInputProps?.maxLength || inputText.length <= props.textInputProps?.maxLength) {
                        props.textInputProps.onChangeText(inputText);
                    }
                }}
                onFocus={() => {
                    if (props.textInputProps.value === initialText) {
                        props.textInputProps.onChangeText('');
                    }
                }}
                onBlur={() => {
                    if (props.textInputProps.value === '') {
                        props.textInputProps.onChangeText(initialText);
                    }
                    props.textInputProps.onBlur?.();
                }}
                multiline={props.textInputProps?.multiline ?? false}
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
