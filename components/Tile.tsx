import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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

const tileHeight = (Dimensions.get('window').height / 2) - 20;
const tileWidth = (Dimensions.get('window').width / 2) - 20;

const styles = StyleSheet.create({
    projectContainer: {
        position: "relative",
        flexShrink: 0,
        height: tileHeight,
        width: tileWidth,
        backgroundColor: "rgba(218, 87, 87, 1)",
        display: "flex",
        alignItems: "flex-start",
        rowGap: 0,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
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