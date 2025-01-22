import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, FlatList, StatusBar } from 'react-native';
import { getItems, InputObject, storeTuples } from '@/components/UserInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {
  onSelect: () => void;
  onCloseModal: () => void;
};

interface Task {
  createdAt: number;
  createdBy: string;
  description: string;
  title: string;
  userId: string;
  taskId: string;
  status: string;
}

const restEndpoint = "http://10.0.0.163:8080/tasks/99b78426-1221-4a62-8896-49a0e56b2af3";

const populateLocalStorageFromServer = async () => {
  console.log('Try to fetch tasks from server');
  const response = await fetch(restEndpoint);
  if (response.status != 200) {
    throw new Error('Unknown exception');
  }    

  const jsonResponse = await response.json();
  console.log('Retrieved following from server -', jsonResponse);
  const tasksArray: Task[] = jsonResponse.tasks;
  const titles = tasksArray.map(task => task.title);

  await storeTuples(titles, 'task');
};

export default function Tasks({ onSelect, onCloseModal }: Props) {
  const [tasks, setTasks] = useState<InputObject[]>([]); // State for storing tasks

  useEffect(() => {
    // Fetch tasks asynchronously

    const fetchTasks = async () => {
      await populateLocalStorageFromServer();
      const fetchedTasks = await getItems('task'); // Await the async function
      setTasks(fetchedTasks); // Set the state with the fetched tasks
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
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Item title={item.value} />}
          keyExtractor={item => item.key}
        />
      </SafeAreaView>
    </SafeAreaProvider>
    //   <FlatList
    //   horizontal
    //   showsHorizontalScrollIndicator={Platform.OS === 'web'}
    //   data={emoji}
    //   contentContainerStyle={styles.listContainer}
    //   renderItem={({ item, index }) => (
    //     <Pressable
    //       onPress={() => {
    //         onSelect(item);
    //         onCloseModal();
    //       }}>
    //       <Image source={item} key={index} style={styles.image} />
    //     </Pressable>
    //   )}
    // />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
