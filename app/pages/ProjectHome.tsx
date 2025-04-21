import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'; // Import SafeAreaView and TextInput
import { ButtonType1 } from '@/components/ButtonType1';
import { bottomHalfWidthPlacement, fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer
import { PROJECT_NAME_TEXT, PROJECT_DESCRIPTION_TEXT, SUMMARIZE_BUTTON_TEXT, CREATE_TASK_BUTTON_TEXT } from '@/app/pages/LocalizationStrings';
import { router, useLocalSearchParams } from 'expo-router';
import { isAccessTokenValid } from '@/localStorage/accessToken';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectTaskComponent } from '@/components/ProjectTaskComponent';
import { RootState } from '@/redux/store';
import { ProjectTask } from '@/models/responseModels/ProjectTask';
import { Project } from '@/models/responseModels/Project';
import { ProjectTaskSubtask } from '@/models/responseModels/ProjectTaskSubtask';
import { ProjectTaskSubTaskComponent } from '@/components/ProjectTaskSubTaskComponent';
import { projectDetailsHandler } from '@/handler/projectDetails';
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
            <View style={styles.projectsViewHomePageContainer}>
                <ButtonType1 key={projectId} displayText={project?.name ?? PROJECT_NAME_TEXT} style={styles.projectName} onPress={() => {
                    projectDetailsHandler(projectId);
                }} />
                <View style={styles.projectTasksContainer}>
                    {!isTasksReady ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        Object.values(projectTasks).map((task: ProjectTask) => (
                            <View key={task.id}>
                                <ProjectTaskComponent
                                    style={styles.taskContainer}
                                    id={task.id}
                                    name={task.name}
                                    description={task.description}
                                    onPress={() => {
                                        console.log('task clicked:', task.id);
                                    }}
                                />
                                {task.subtasks?.map((subtask: ProjectTaskSubtask) => (
                                    <ProjectTaskSubTaskComponent
                                        key={subtask.id}
                                        style={styles.subTaskContainer}
                                        id={subtask.id}
                                        name={subtask.name}
                                        description={subtask.description}
                                        onPress={() => {
                                            console.log('subtask clicked:', subtask.id);
                                        }}
                                    />
                                ))}
                            </View>
                        ))
                    )}
                </View>
                <View style={styles.bottomContainer}>
                    <ButtonType1 displayText={SUMMARIZE_BUTTON_TEXT} style={styles.summarizeButton} onPress={() => {
                        console.log('summarize project');
                    }} />
                    <ButtonType1 displayText={CREATE_TASK_BUTTON_TEXT} style={styles.createTaskButton} onPress={() => {
                        console.log('create task');
                    }} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Ensure SafeAreaView takes full screen
    },
    projectsViewHomePageContainer: {
        ...fullPageContainer,
        flexDirection: 'column',
    },
    createTaskButton: {
        ...bottomHalfWidthPlacement,
        height: 51,
    },
    summarizeButton: {
        ...bottomHalfWidthPlacement,
        height: 51,
    },
    projectTasksContainer: {
        flex: 1, // remaining space is divided between the projectDescription and generatedTasksAndSubTasksContainer
        flexDirection: 'column',
        overflow: 'scroll',
    },
    taskContainer: {
        width: '100%',
        height: 32,
        backgroundColor: 'darkgray',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    subTaskContainer: {
        width: '95%',
        marginLeft: '5%',
        height: 32,
        backgroundColor: 'darkgray',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    bottomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    projectName: {
        height: 25,
        // align self to left
        alignSelf: 'flex-start',
    }
});