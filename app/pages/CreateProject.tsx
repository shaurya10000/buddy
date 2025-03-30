import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput } from 'react-native'; // Import SafeAreaView and TextInput
import { ButtonType1 } from '@/components/ButtonType1';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { createProjectHandler } from '@/handler/createProject';
import { fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer

export default function CreateProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}> // Wrap with SafeAreaView
            <View style={styles.createProjectContainer}>
                {/* <EdittableRichTextBox1NoBoundary displayText="Project Description" style={styles.projectDescription}/> */}
                <ButtonType1 displayText="Create" style={styles.createProjectButton} onPress={() => {
                    createProjectHandler(name, description);
                }} />
                <ButtonType1 displayText="Generate Tasks & SubTasks" style={styles.generateTasksSubTasksButton} onPress={() => {
                    console.log('Generate Tasks & SubTasks');
                }} />
                <EdittableRichTextBox1NoBoundary displayText="Project Description" style={styles.projectDescription} textInputProps={styles.projectDescriptionTextInput} multiline={true} maxLength={10000} />
                <EdittableRichTextBox1NoBoundary displayText="Project Name" style={styles.projectName} textInputProps={styles.projectNameTextInput} multiline={true} maxLength={100} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Ensure SafeAreaView takes full screen
    },
    createProjectContainer: {
        ...fullPageContainer,
        display: 'flex',
        flex: 1, // Ensure container takes full screen
        flexDirection: 'column-reverse',
    },
    generateTasksSubTasksButton: {
        height: 25,
    },
    createProjectButton: {
        height: 50,
    },
    projectDescription: {
        flex: 1,
    },
    projectName: {
        height: 25,
        // align self to left
        alignSelf: 'flex-start',
    },
    projectNameTextInput: {
        flex: 1,
    },
    projectDescriptionTextInput: {
        flex: 1,
    },
});