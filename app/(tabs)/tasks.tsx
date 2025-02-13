import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, FlatList, StatusBar, TextInput, Button } from 'react-native';
import { getItems, InputObject } from '@/components/UserInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { populateTasksInLocalStorageFromServer } from '@/app/upstreams/fetch';
import BuddyButton from '@/components/BuddyButton';
import { addTask } from '@/components/UserInput';
import { SERVER_ENDPOINT } from '@/constants/Backend';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '@/config/storageKeys';
import { Task } from '@/types/Task';

type Props = {
  onSelect: () => void;
  onCloseModal: () => void;
};

export default function Tasks({ onSelect, onCloseModal }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingAcceptanceTasks, setPendingAcceptanceTasks] = useState<Task[]>([]);
  const [newTask, submitNewTask] = useState('');
  const [taskFor, setTaskFor] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await populateTasksInLocalStorageFromServer();
        const fetchedTasks = await getItems('task'); // Await the async function
        const pendingAcceptanceFetchedTasks = await getItems('pendingAcceptanceTask');
        setTasks(fetchedTasks.map(task => task.value)); // Set the state with the fetched tasks
        console.log('Fetched tasks:', fetchedTasks);
        setPendingAcceptanceTasks(pendingAcceptanceFetchedTasks.map(task => task.value)); // Set the state with the fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
        if (error instanceof Error && error.message === 'Unauthorized') {
          router.replace('/sign-in');
        }
      }
    };

    fetchTasks(); // Call the async function when the component mounts
  }, []); // Don't provide dependency array to ensure that useEffect is called every time the component renders

  const handleAccept = async (taskId: string) => {
    try {
      const accessToken = await AsyncStorage.getItem(storageKeys.token);
            // Post the acceptance to the server
      await fetch(`${SERVER_ENDPOINT}tasks/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ taskIds: [taskId], status: 'ACCEPTED', note: '' }),
      });
      // Update the local state or refetch tasks if needed
    } catch (error) {
      console.error('Error accepting task:', error);
    }
  };

  const handleReject = async (taskId: string) => {
    try {
      const accessToken = await AsyncStorage.getItem(storageKeys.token);
      // Post the rejection to the server
      await fetch(`${SERVER_ENDPOINT}tasks/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ taskIds: [taskId], status: 'REJECTED', note: '' }),
      });
      // Update the local state or refetch tasks if needed
    } catch (error) {
      console.error('Error rejecting task:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const accessToken = await AsyncStorage.getItem(storageKeys.token);
      await fetch(`${SERVER_ENDPOINT}tasks/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ taskIds: [taskId] }),
      });
      // Optionally update local state or refetch tasks
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDone = async (taskId: string) => {
    try {
      const accessToken = await AsyncStorage.getItem(storageKeys.token);
      await fetch(`${SERVER_ENDPOINT}tasks/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ taskIds: [taskId], status: 'DONE', note: '' }),
      });
      // Optionally update local state or refetch tasks
    } catch (error) {
      console.error('Error marking task as done:', error);
    }
  };

  type ItemProps = { title: string; id: string; isPending: boolean };

  const Item = ({ title, id, isPending }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttons}>
        {!isPending && (
          <>
            <View style={styles.buttonContainer}>
              <Button title="Done" onPress={() => handleDone(id)} color="darkgreen" />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Delete" onPress={() => handleDelete(id)} color="darkred" />
            </View>
          </>
        )}
        {isPending && (
          <>
            <View style={styles.buttonContainer}>
              <Button title="Accept" onPress={() => handleAccept(id)} color="darkgreen" />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Reject" onPress={() => handleReject(id)} color="darkred" />
            </View>
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={{ height: 40, padding: 5, color: 'white' }}
          placeholder="CreateFor"
          placeholderTextColor="white"
          onChangeText={newTaskFor => setTaskFor(newTaskFor)}
          defaultValue={taskFor}
        />
        <TextInput
          style={{ height: 40, padding: 5, color: 'white' }}
          placeholder="Type here"
          placeholderTextColor="white"
          onChangeText={acceptNewTask => submitNewTask(acceptNewTask)}
          defaultValue={newTask}
        />
        <BuddyButton theme="buddy" label="Submit" inputType='' input={newTask} createFor={taskFor} onPress={() => addTask(newTask, taskFor)} />
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Item title={item.title} id={item.taskId} isPending={false} />}
          keyExtractor={item => item.taskId}
        />
        <Text style={{ height: 40, padding: 5, color: 'white' }}> Pending Acceptance Tasks</Text>
        <FlatList
          data={pendingAcceptanceTasks}
          renderItem={({ item }) => <Item title={item.title} id={item.taskId} isPending={true} />}
          keyExtractor={item => item.taskId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    fontSize: 12,
    color: 'white',
    marginHorizontal: 2,
  },
});
