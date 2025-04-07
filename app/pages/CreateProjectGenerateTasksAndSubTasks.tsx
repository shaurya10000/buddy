import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'; // Import SafeAreaView and TextInput
import { ButtonType1 } from '@/components/ButtonType1';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { createProjectHandler } from '@/handler/createProject';
import { fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer
import { MAX_PROJECT_NAME_LENGTH, MAX_PROJECT_DESCRIPTION_LENGTH } from '@/app/pages/constants';
import { PROJECT_NAME_TEXT, PROJECT_DESCRIPTION_TEXT, REGENERATE_TASKS_SUBTASKS_BUTTON_TEXT } from '@/app/pages/LocalizationStrings';
import { router } from 'expo-router';
import { isAccessTokenValid } from '@/localStorage/accessToken';
import { useSelector } from 'react-redux';
import { ProjectTask } from '@/models/responseModels/ProjectTask';
import { ProjectTaskSubtask } from '@/models/responseModels/ProjectTaskSubtask';
import { ProjectTaskComponent } from '@/components/ProjectTaskComponent';
import { ProjectTaskSubTaskComponent } from '@/components/ProjectTaskSubTaskComponent';

export default function CreateProject() {
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
    const [taskCheckedStates, setTaskCheckedStates] = useState<{ [key: string]: boolean }>({});

    const tasksAndSubTasksReady = useSelector((state: any) => state.tasks.tasksAndSubTasksReady);
    const tasks = useSelector((state: any) => state.tasks.tasks);

    // Add this useEffect to watch for changes
    useEffect(() => {
        if (tasksAndSubTasksReady) {
            // Add any additional logic you want to run when tasks are ready
            console.log('Tasks and subtasks are now ready:', tasks);
        }
    }, [tasksAndSubTasksReady, tasks]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.createProjectContainer}>
                <ButtonType1 displayText="Create" style={styles.createProjectButton} onPress={() => {
                    createProjectHandler(name, description);
                }} />
                <View style={styles.generatedTasksAndSubTasksContainer}>
                    {!tasksAndSubTasksReady ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (tasks.map((task: ProjectTask) => (
                        <View key={task.id}>
                            <ProjectTaskComponent
                                style={styles.taskContainer}
                                id={task.id}
                                name={task.name}
                                description={task.description}
                                isChecked={taskCheckedStates[task.id] ?? true}
                                onCheckChange={(checked) => {
                                    setTaskCheckedStates(prev => ({
                                        ...prev,
                                        [task.id]: checked
                                    }));
                                }}
                            />
                            {task.subtasks?.map((subTask: ProjectTaskSubtask) => (
                                <ProjectTaskSubTaskComponent
                                    key={subTask.id}
                                    style={styles.subTaskContainer}
                                    id={subTask.id}
                                    name={subTask.name}
                                    description={subTask.description}
                                    isTaskChecked={taskCheckedStates[task.id] ?? true}
                                />
                            ))}
                        </View>
                    ))
                    )}
                </View>
                <ButtonType1 displayText={REGENERATE_TASKS_SUBTASKS_BUTTON_TEXT} style={styles.generateTasksSubTasksButton} onPress={() => {
                    console.log('Regenerate Tasks & SubTasks for project: ', name, ' and description: ', description);
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
    generatedTasksAndSubTasksContainer: {
        flex: 1, // remaining space is divided between the projectDescription and generatedTasksAndSubTasksContainer
        flexDirection: 'column',
        overflow: 'scroll',
    },
    projectDescription: {
        flex: 1, // remaining space is divided between the projectDescription and generatedTasksAndSubTasksContainer
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
    taskContainer: {
        width: '80%',
        height: 32,
        backgroundColor: 'darkgray',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%',
    },
    subTaskContainer: {
        width: '70%',
        height: 32,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '20%',
    }
});