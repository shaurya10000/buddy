// This file is the page for creating a new project.

import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import { ButtonType2 } from '@/components/ButtonType2';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { handleCreateProject, handleCancel } from '@/utils/projectHandlers';

export default function CreateProject() {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    return (
        <View style={styles.container}>
            <EdittableRichTextBox1NoBoundary displayText="Create a New Project" />
            <TextInput
                style={styles.input}
                placeholder="Project Name"
                value={projectName}
                onChangeText={setProjectName}
            />
            <TextInput
                style={styles.input}
                placeholder="Project Description"
                value={projectDescription}
                onChangeText={setProjectDescription}
                multiline
            />
            <ButtonType1 displayText="Create Project" style={styles.button} testID="createProjectButton" onPress={() => handleCreateProject(projectName, projectDescription)} />
            <ButtonType2 displayText="Cancel" testID="cancelButton" onPress={handleCancel} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        marginTop: 20,
    },
});
