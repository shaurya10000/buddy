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
import { formatDate, getCompletedTasksCount, getTotalTasksCount, getSharedWith, formatTime } from '@/utils/projectUtils';
import { UneditableStylishTextInBox } from '@/components/UneditableStylishTextInBox';
import { updateProjectDescriptionHandler } from '@/handler/projectDetails';
import { ProjectTask } from '@/models/responseModels/ProjectTask';
export default function ProjectDetails() {
    // Go to SignInPage if user is not signed in
    useEffect(() => {
        isAccessTokenValid().then((isValid) => {
            if (!isValid) {
                router.replace('/sign-in');
            }
        });
    }, []);

    const dispatch = useDispatch();

    const { projectId } = useLocalSearchParams<{ projectId: string }>();

    // Get project from Redux
    const project: Project | null = useSelector((state: RootState) =>
        state.committedProjectTasks.projects[projectId] ?? null
    );

    const tasks: ProjectTask[] | null = useSelector((state: RootState) =>
        state.committedProjectTasks.tasksByProjectId[projectId] ?? null
    );

    const [name, setName] = useState(PROJECT_NAME_TEXT);
    const [description, setDescription] = useState(project?.description);

    return (
        <SafeAreaView style={styles.safeArea}>
            <UneditableStylishTextInBox style={styles.projectName} displayText={project?.name ?? PROJECT_NAME_TEXT} />
            <EdittableRichTextBox1NoBoundary
                style={styles.projectDescription}
                textInputProps={
                    {
                        initialValue: PROJECT_DESCRIPTION_TEXT,
                        value: description,
                        onChangeText: setDescription,
                        multiline: true,
                        maxLength: MAX_PROJECT_DESCRIPTION_LENGTH,
                        styles: styles.projectDescriptionTextInput,
                        onBlur: () => {
                            updateProjectDescriptionHandler(project, description, dispatch);
                        }
                    }}
            />
            <View style={styles.projectDetailsContainer}>
                <View style={styles.leftColumnContainer}>
                <View style={styles.createdByContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Created By</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{project?.createdBy}</ThemedText>
                    </View>
                    <View style={styles.createdOnContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Created On</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{formatDate(project?.createdAt)}</ThemedText>
                    </View>
                    <View style={styles.createdAtContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Created At</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{formatTime(project?.createdAt)}</ThemedText>
                    </View>
                    <View style={styles.updatedOnContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Last Updated On</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{formatDate(project?.updatedAt)}</ThemedText>
                    </View>
                    <View style={styles.updatedAtContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Last Updated At</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{formatTime(project?.updatedAt)}</ThemedText>
                    </View>
                    <View style={styles.completedTasksCountContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Completed Tasks</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{getCompletedTasksCount(tasks)}</ThemedText>
                    </View>
                    <View style={styles.totalTasksCountContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Total Tasks</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{getTotalTasksCount(tasks)}</ThemedText>
                    </View>
                </View>
                <View style={styles.rightColumnContainer}>
                    <View style={styles.sharedWithContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Shared With</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{getSharedWith(project)}</ThemedText>
                    </View>
                    <View style={styles.dueDateContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Due Date</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{formatDate(project?.dueDate)}</ThemedText>
                    </View>
                    <View style={styles.statusContainer}>
                        <ThemedText type="subtitle" darkColor='black' allMargins={10}>Status</ThemedText>
                        <ThemedText type="default" darkColor='darkGray'>{project?.status}</ThemedText>
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
                            styles: styles.projectNameTextInput,
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
    projectDescription: {
        flex: 1,
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
        flexWrap: 'wrap',
        minWidth: '50%',
    },
    rightColumnContainer: {
        flex: 1,                  // Takes up equal space as leftColumnContainer (50% of width)
        display: 'flex',          // Uses flexbox layout
        flexDirection: 'column',  // Arranges children vertically
        minWidth: '50%',          // Without this, the right column overlaps with the left column
    },
    createdByContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    createdAtContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    createdOnContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    updatedAtContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    updatedOnContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    completedTasksCountContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    totalTasksCountContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    sharedWithContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    dueDateContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    statusContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
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