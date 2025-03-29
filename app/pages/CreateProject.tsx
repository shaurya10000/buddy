// This file is the page for creating a new project.

import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { createProjectHandler } from '@/handler/createProject';
import { buttonAtBottom, fullPageContainer } from '@/app/styles/common';

export default function CreateProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View style={styles.createProjectContainer}>
            {/* component edittableRichTextBox1NoBoundary */}
            <EdittableRichTextBox1NoBoundary displayText="Type in the name of your project" />
            {/* Visualwind:: can be replaced with <_edittableRichTextBox1NoBoundary  /> */}
            <EdittableRichTextBox1NoBoundary displayText="Type in the description of your project" />
            {/* Visualwind:: can be replaced with <ButtonType1  /> */}
            <ButtonType1 displayText="Generate Tasks & SubTasks" onPress={() => {
                handleGenerateTasksSubTasks();
            }} />
            {/* Visualwind:: can be replaced with <ButtonType2  /> */}
            <ButtonType1 displayText="Create" style={styles.createProjectButton} onPress={() => {
                createProjectHandler(name, description);
            }} />
        </View>  )
}

const styles = StyleSheet.create({
    createProjectContainer: {
        ...fullPageContainer,
    },
    edittableRichTextBox1NoBoundary: {
        position: "absolute",
        flexShrink: 0,
        top: 69,
        left: 19,
        width: 640,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10
    },
    projectDescription: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400
    },
    _edittableRichTextBox1NoBoundary: {
        position: "absolute",
        flexShrink: 0,
        top: 29,
        left: 19,
        width: 640,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10
    },
    projectName: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400
    },
    createProjectButton: {
        ...buttonAtBottom,
    },
    generateTasksSubTasks: {
        position: "absolute",
        flexShrink: 0,
        top: 3,
        right: 262,
        bottom: 4,
        left: 260,
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400
    }
});