import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export interface ProjectProps {
    displayText: string,
    color: string,
    /** Used to locate this view in end-to-end tests. */
    testID?: string,
}

export default function Project(props: ProjectProps) {
    return (
        <View style={[styles.projectContainer, { backgroundColor: props.color }]} testID={props.testID ?? "47:29"}>
            <Text style={styles.text} testID="7:38">
            {props.displayText}
            </Text>
        </View>  )
}

const styles = StyleSheet.create({
    projectContainer: {
        position: "relative",
        flexShrink: 0,
        height: 125,
        width: 340,
        backgroundColor: "rgba(218, 87, 87, 1)",
        display: "flex",
        alignItems: "flex-start",
        rowGap: 0
    },
    text: {
        position: "absolute",
        flexShrink: 0,
        right: 149,
        bottom: 54,
        left: 142,
        textAlign: "left",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400
    }
});