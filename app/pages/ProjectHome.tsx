import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'; // Import SafeAreaView and TextInput
import { ButtonType1 } from '@/components/ButtonType1';
import { fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer
import { PROJECT_NAME_TEXT, PROJECT_DESCRIPTION_TEXT, SUMMARIZE_BUTTON_TEXT, CREATE_TASK_BUTTON_TEXT } from '@/app/pages/LocalizationStrings';
import { router, useLocalSearchParams } from 'expo-router';
import { isAccessTokenValid } from '@/localStorage/accessToken';
import { useDispatch, useSelector } from 'react-redux';
import Title from '@/components/Title';
import { ProjectTaskComponent } from '@/components/ProjectTaskComponent';
import { RootState } from '@/redux/store';
import { ProjectTask } from '@/models/responseModels/ProjectTask';
import { Project } from '@/models/responseModels/Project';
export default function ProjectHome() {
    // Get projectId from URL params
    const { projectId } = useLocalSearchParams<{ projectId: string }>();

    // Get project from Redux
    const project: Project | null = useSelector((state: RootState) => 
        state.committedProjectTasks.projects[projectId] ?? null
    );
    // Get tasks for this specific project from Redux
    const projectTasks: Record<string, ProjectTask> = useSelector((state: RootState) => 
        state.committedProjectTasks.tasksByProjectId[projectId] ?? {}
    );
    const isTasksReady: boolean = useSelector((state: RootState) => 
        state.committedProjectTasks.readyStateByProjectId[projectId] ?? false
    );

    // Go to SignInPage if user is not signed in
    useEffect(() => {
        isAccessTokenValid().then((isValid) => {
            if (!isValid) {
                router.replace('/sign-in');
            }
        });
    }, []);

    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description);
        }
    }, [project, projectTasks, isTasksReady]);

    const [name, setName] = useState(project?.name ?? PROJECT_NAME_TEXT);
    const [description, setDescription] = useState(project?.description ?? PROJECT_DESCRIPTION_TEXT);
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.projectTitle}>
                <ButtonType1 displayText={SUMMARIZE_BUTTON_TEXT} style={styles.summarizeButton} onPress={() => {
                    console.log('summarize project');
                }} />
                <ButtonType1 displayText={CREATE_TASK_BUTTON_TEXT} style={styles.createTaskButton} onPress={() => {
                    console.log('create task');
                }} />
            </View>
            <View style={styles.projectContainer}>
                {!isTasksReady ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    Object.values(projectTasks).map((task: ProjectTask) => (
                        <ProjectTaskComponent
                            key={task.id}
                            id={task.id}
                            name={task.name}
                            description={task.description}
                            onPress={() => {
                                console.log('task 1');
                            }}
                        />
                    ))
                )}
            </View>
            <View style={styles.projectTitle}>
                <Title key={projectId} displayText={name} color={project?.color} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Ensure SafeAreaView takes full screen
    },
    projectTaskContainer: {
        width: '80%',
        height: 32,
        backgroundColor: 'darkgray',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    projectContainer: {
        ...fullPageContainer,
        display: 'flex',
        flex: 1, // Ensure container takes full screen
        flexDirection: 'column-reverse',
    },
    summarizeButton: {
        height: 50,
        minWidth: '48%',
    },
    createTaskButton: {
        height: 50,
        minWidth: '48%',
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
    projectTitle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'scroll',
    }
});