import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export interface TitleProps {
    displayText: string,
    color: string,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
}

export default function Title(props: TitleProps) {
    return (
        <View style={[styles.titleContainer, { backgroundColor: props.color }]} testID={props.testID ?? "47:29"}>
            <Text style={styles.text} testID="7:38">
            {props.displayText}
            </Text>
        </View>  )
}

const styles = StyleSheet.create({
    titleContainer: {
        display: "flex",
        backgroundColor: "rgba(218, 87, 87, 1)",
    },
    text: {
        // The flexShrink property specifies that the text should not shrink when there is not enough space.
        flexShrink: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [
            { translateX: '-50%' },
            { translateY: '-50%' }
        ],
        textAlign: "left",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400
    }
});