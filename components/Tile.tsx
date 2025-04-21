import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export interface TileProps {
    displayText: string,
    color: string,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
    onPress: () => void,
}

export default function Tile(props: TileProps) {
    return (
        <Pressable onPress={props.onPress} style={[styles.projectContainer, { backgroundColor: props.color }]}>
            <Text style={styles.text} testID="7:38">
                {props.displayText}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    projectContainer: {
        flex: 1,
        display: "flex",
        height: '48%',
        minWidth: '48%',
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