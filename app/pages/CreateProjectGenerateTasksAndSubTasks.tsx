import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'; // Import SafeAreaView and TextInput
import { ButtonType1 } from '@/components/ButtonType1';
import { EdittableRichTextBox1NoBoundary } from '@/components/EditableRichTextBoxNoBoundary';
import { createProjectHandler } from '@/handler/createProject';
import { fullPageContainer } from '@/app/styles/common'; // Import fullPageContainer
import { MAX_PROJECT_NAME_LENGTH, MAX_PROJECT_DESCRIPTION_LENGTH } from '@/app/pages/constants';
import { PROJECT_NAME_TEXT, PROJECT_DESCRIPTION_TEXT, REGENERATE_TASKS_SUBTASKS_BUTTON_TEXT, CREATE_BUTTON_TEXT } from '@/app/pages/LocalizationStrings';
import { router } from 'expo-router';
import { isAccessTokenValid } from '@/localStorage/accessToken';
import { useDispatch, useSelector } from 'react-redux';
import { DraftProjectTaskComponent } from '@/components/DraftProjectTaskComponent';
import { DraftProjectTaskSubTaskComponent } from '@/components/DraftProjectTaskSubTaskComponent';
import { generateTasksAndSubTasksHandler } from '@/handler/generateTasksAndSubTasks';
import { DraftProjectTask } from '@/models/requestModels/DraftProjectTask';
import { DraftProjectTaskSubtask } from '@/models/requestModels/DraftProjectTaskSubtask';
import { generateProjectId } from '@/utils/projectUtils';
import { RootState } from '@/redux/store';

export default function CreateProjectGenerateTasksAndSubTasks() {
    // Go to SignInPage if user is not signed in
    useEffect(() => {
        isAccessTokenValid().then((isValid) => {
            if (!isValid) {
                router.replace('/sign-in');
            }
        });
    }, []);

    const [taskCheckedStates, setTaskCheckedStates] = useState<{ [key: string]: boolean }>({});

    const draftProject = useSelector((state: RootState) => state.draftProjectTasks.project);
    const [name, setName] = useState(PROJECT_NAME_TEXT);
    const [description, setDescription] = useState(PROJECT_DESCRIPTION_TEXT);

    const draftTasksAndSubTasksReady = useSelector((state: RootState) => state.draftProjectTasks.draftTasksAndSubTasksReady);
    const tasks = useSelector((state: RootState) => state.draftProjectTasks.tasks);

    const dispatch = useDispatch();

    // Add this useEffect to watch for changes
    useEffect(() => {
        if (draftTasksAndSubTasksReady) {
            // Add any additional logic you want to run when tasks are ready
            console.log('Tasks and subtasks are now ready:', tasks);
        }
        if (draftProject) {
            setName(draftProject.name);
            setDescription(draftProject.description);
        }
    }, [draftTasksAndSubTasksReady, tasks, draftProject]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.createProjectContainer}>
                <ButtonType1 displayText={CREATE_BUTTON_TEXT} style={styles.createProjectButton} onPress={() => {
                    let projectId = '';
                    const tasksToCreate: DraftProjectTask[] = tasks.filter((task: DraftProjectTask) => {
                        projectId = task.projectId;
                        return taskCheckedStates[task.id] === undefined || taskCheckedStates[task.id] === true;
                    }).map((task: DraftProjectTask) => {
                        return {
                            id: task.id,
                            name: task.name,
                            description: task.description,
                            projectId: task.projectId,
                            assignee: task.assignee,
                            subtasks: task.subtasks?.filter((subtask: DraftProjectTaskSubtask) => {
                                return taskCheckedStates[subtask.id] === undefined || taskCheckedStates[subtask.id] === true;
                            }) ?? [],
                        };
                    });
                    createProjectHandler(projectId, name, description, dispatch, tasksToCreate);
                }} />
                <View style={styles.generatedTasksAndSubTasksContainer}>
                    {!draftTasksAndSubTasksReady ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (tasks.map((task: DraftProjectTask) => (
                        <View key={task.id}>
                            <DraftProjectTaskComponent
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
                            {task.subtasks?.map((subTask: DraftProjectTaskSubtask) => (
                                <DraftProjectTaskSubTaskComponent
                                    key={subTask.id}
                                    style={styles.subTaskContainer}
                                    id={subTask.id}
                                    name={subTask.name}
                                    description={subTask.description}
                                    isTaskChecked={taskCheckedStates[task.id] ?? true}
                                    onCheckChange={(checked) => {
                                        setTaskCheckedStates(prev => ({
                                            ...prev,
                                            [subTask.id]: checked
                                        }));
                                    }}
                                />
                            ))}
                        </View>
                    ))
                    )}
                </View>
                <ButtonType1 displayText={REGENERATE_TASKS_SUBTASKS_BUTTON_TEXT} style={styles.generateTasksSubTasksButton} onPress={() => {
                    generateTasksAndSubTasksHandler(name, description, dispatch);
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
                            value: name,
                            onChangeText: setName,
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
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    subTaskContainer: {
        width: '80%',
        height: 32,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '20%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    }
});