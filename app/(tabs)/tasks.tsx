import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, FlatList, StatusBar } from 'react-native';
import { getItems, InputObject } from '@/components/UserInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { populateTasksInLocalStorageFromServer } from '@/app/upstreams/fetch';
import { TextInput } from 'react-native';
import BuddyButton from '@/components/BuddyButton';
import { addTask } from '@/components/UserInput';

type Props = {
  onSelect: () => void;
  onCloseModal: () => void;
};

export default function Tasks({ onSelect, onCloseModal }: Props) {
  const [tasks, setTasks] = useState<InputObject[]>([]); // State for storing tasks
  const [pendingAcceptanceTasks, setPendingAcceptanceTasks] = useState<InputObject[]>([]); // State for tasks pending for acceptance
  const [newTask, submitNewTask] = useState(''); // State for accepting new tasks
  const [taskFor, setTaskFor] = useState('');

  useEffect(() => {
    // Fetch tasks asynchronously

    const fetchTasks = async () => {
      await populateTasksInLocalStorageFromServer();
      const fetchedTasks = await getItems('task'); // Await the async function
      const pendingAcceptanceFetchedTasks = await getItems('pendingAcceptanceTask');
      setTasks(fetchedTasks); // Set the state with the fetched tasks
      setPendingAcceptanceTasks(pendingAcceptanceFetchedTasks); // Set the state with the fetched tasks
    };

    fetchTasks(); // Call the async function when the component mounts
  }, []); // Don't provide dependency array to ensure that useEffect is called every time the component renders
  // }, []); // Empty dependency array ensures this effect runs only once (on mount)


  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
          renderItem={({ item }) => <Item title={item.value} />}
          keyExtractor={item => item.key}
        />
        <Text style={{ height: 40, padding: 5, color: 'white' }}> Pending Acceptance Tasks</Text>
        <FlatList
          data={pendingAcceptanceTasks}
          renderItem={({ item }) => <Item title={item.value} />}
          keyExtractor={item => item.key}
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
