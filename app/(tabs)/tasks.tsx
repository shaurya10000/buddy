import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, FlatList, StatusBar } from 'react-native';
import { getItems, InputObject } from '@/components/UserInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { populateLocalStorageFromServer } from '@/app/upstreams/fetch';

type Props = {
  onSelect: () => void;
  onCloseModal: () => void;
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
