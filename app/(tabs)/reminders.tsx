import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, FlatList, StatusBar } from 'react-native';
import { getItems, InputObject } from '@/components/UserInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {
  onSelect: () => void;
  onCloseModal: () => void;
};

export default function Reminders({ onSelect, onCloseModal }: Props) {
  const [reminders, setReminders] = useState<InputObject[]>([]); // State for storing reminders

  useEffect(() => {
    // Fetch reminders asynchronously
    const fetchReminders = async () => {
      const fetchedReminders = await getItems('reminder'); // Await the async function
      setReminders(fetchedReminders); // Set the state with the fetched reminders
    };

    fetchReminders(); // Call the async function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once (on mount)


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
          data={reminders}
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
