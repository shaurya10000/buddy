import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer
import { MAX_PROJECT_NAME_LENGTH, MAX_PROJECT_DESCRIPTION_LENGTH } from '@/app/pages/constants';
import { PROJECT_NAME_TEXT, PROJECT_DESCRIPTION_TEXT, ARCHIVE_BUTTON_TEXT } from '@/app/pages/LocalizationStrings';
import { router, useLocalSearchParams } from 'expo-router';
import { isAccessTokenValid } from '@/localStorage/accessToken';
import { useDispatch, useSelector } from 'react-redux';
import { Project } from '@/models/responseModels/Project';
import { RootState } from '@/redux/store';
import { archiveProjectHandler } from '@/handler/archiveProject';

export default function ProjectMetadata() {
    // Go to SignInPage if user is not signed in
    useEffect(() => {
        isAccessTokenValid().then((isValid) => {
            if (!isValid) {
                router.replace('/sign-in');
            }
        });
    }, []);

    const [name, setName] = useState(PROJECT_NAME_TEXT);
    const [description, setDescription] = useState(PROJECT_DESCRIPTION_TEXT);
    const dispatch = useDispatch();

    const { projectId } = useLocalSearchParams<{ projectId: string }>();

    // Get project from Redux
    const project: Project | null = useSelector((state: RootState) =>
        state.committedProjectTasks.projects[projectId] ?? null
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.projectName}>
                <Text style={styles.projectNameTextInput}>{project?.name ?? PROJECT_NAME_TEXT}</Text>
            </View>
            <View style={styles.projectDetailsContainer}>
                <View style={styles.leftColumnContainer}>

                </View>
                <View style={styles.rightColumnContainer}>

                </View>
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
            <ButtonType1 displayText={ARCHIVE_BUTTON_TEXT} style={styles.archiveProjectButton} onPress={() => {
                archiveProjectHandler(projectId, dispatch);
            }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        ...fullPageContainer,
        flexDirection: 'column',
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
    archiveProjectButton: {
        height: 50,
    },
    projectDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    leftColumnContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    rightColumnContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
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