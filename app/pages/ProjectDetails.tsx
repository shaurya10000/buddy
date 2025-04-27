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
import { ThemedText } from '@/components/ThemedText';
import { getCompletedTasksCount, getTotalTasksCount } from '@/utils/projectUtils';

export default function ProjectDetails() {
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
            <View style={styles.projectDetailsContainer}>
                <View style={styles.leftColumnContainer}>
                <View style={styles.createdByContainer}>
                        <ThemedText type="subtitle">Created By</ThemedText>
                        <ThemedText type="default">{project?.createdBy}</ThemedText>
                    </View>
                    <View style={styles.createdAtContainer}>
                        <ThemedText type="subtitle">Created At</ThemedText>
                        <ThemedText type="default">{project?.createdAt.toLocaleString()}</ThemedText>
                    </View>
                    <View style={styles.completedTasksCountContainer}>
                        <ThemedText type="subtitle">Completed Tasks</ThemedText>
                        <ThemedText type="default">{getCompletedTasksCount(project)}</ThemedText>
                    </View>
                    <View style={styles.totalTasksCountContainer}>
                        <ThemedText type="subtitle">Total Tasks</ThemedText>
                        <ThemedText type="default">{getTotalTasksCount(project)}</ThemedText>
                    </View>
                </View>
                <View style={styles.rightColumnContainer}>
                    <View style={styles.sharedWithContainer}>
                        <ThemedText type="subtitle">Shared With</ThemedText>
                        <ThemedText type="default">{project?.sharedWith?.map((user) => user.name).join(', ')}</ThemedText>
                    </View>
                    <View style={styles.dueDateContainer}>
                        <ThemedText type="subtitle">Due Date</ThemedText>
                        <ThemedText type="default">{project?.dueDate?.toLocaleString()}</ThemedText>
                    </View>
                </View>
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
        display: 'flex',
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
    createdByContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    createdAtContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    completedTasksCountContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    totalTasksCountContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    sharedWithContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    dueDateContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
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