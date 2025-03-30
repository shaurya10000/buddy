import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native'; // Import SafeAreaView and TextInput
import { ButtonType1 } from '@/components/ButtonType1';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { createProjectHandler } from '@/handler/createProject';
import { fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer
import { MAX_PROJECT_NAME_LENGTH, MAX_PROJECT_DESCRIPTION_LENGTH } from '@/app/pages/constants';
import { PROJECT_NAME_TEXT, PROJECT_DESCRIPTION_TEXT, GENERATE_TASKS_SUBTASKS_BUTTON_TEXT } from '@/app/pages/LocalizationStrings';

export default function CreateProject() {
    const [name, setName] = useState(PROJECT_NAME_TEXT);
    const [description, setDescription] = useState(PROJECT_DESCRIPTION_TEXT);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.createProjectContainer}>
                <ButtonType1 displayText="Create" style={styles.createProjectButton} onPress={() => {
                    createProjectHandler(name, description);
                }} />
                <ButtonType1 displayText={GENERATE_TASKS_SUBTASKS_BUTTON_TEXT} style={styles.generateTasksSubTasksButton} onPress={() => {
                    console.log('Generate Tasks & SubTasks for project: ', name, ' and description: ', description);
                }} />
                <EdittableRichTextBox1NoBoundary
                    style={styles.projectDescription}
                    textInputProps={
                        {
                            initialValue: PROJECT_DESCRIPTION_TEXT,
                            value: description,
                            onChangeText: setDescription,
                            multiline: true,
                            maxLength: MAX_PROJECT_DESCRIPTION_LENGTH,
                            styles: styles.projectDescriptionTextInput
                        }}
                />
                <EdittableRichTextBox1NoBoundary
                    style={styles.projectName}
                    textInputProps={
                        {
                            initialValue: PROJECT_NAME_TEXT,
                            value: name, onChangeText: setName,
                            maxLength: MAX_PROJECT_NAME_LENGTH,
                            multiline: true,
                            styles: styles.projectNameTextInput
                        }}
                />
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