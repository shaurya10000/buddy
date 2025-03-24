import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import Tile from '@/components/Tile';
import { create } from 'domain';

export default function ProjectsViewHomePage() {
    return (
        <View style={styles.projectsViewHomePageContainer}>
            <Tile displayText="Project 1" color="#DA5757" />
            <Tile displayText="Project 2" color="#C6B058" />
            <Tile displayText="Project 3" color="#9747FF" />
            <Tile displayText="Project 4" color="#338748" />
            <ButtonType1 displayText="Create Project" style={styles.createProjectButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    projectsViewHomePageContainer: {
        flex: 1,
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 1)",
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
        // padding: 10,
    },
    createProjectButton: {
        position: "absolute",
        // Below three lines are used to position the button at the bottom of the container
        //--------------------------------
        marginTop: "auto",
        bottom: 0,
        left: 0,
        //--------------------------------
        // End of positioning the button at the bottom of the container
    }
});