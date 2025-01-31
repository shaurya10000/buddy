import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, FlatList, StatusBar } from 'react-native';
import { getItems, InputObject } from '@/components/UserInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import BuddyButton from '@/components/BuddyButton';
import { addReminder } from '@/components/UserInput';
import { populateRemindersInLocalStorageFromServer } from '@/app/upstreams/fetch';

type Props = {
  onSelect: () => void;
  onCloseModal: () => void;
};

export default function Reminders({ onSelect, onCloseModal }: Props) {
  const [reminders, setReminders] = useState<InputObject[]>([]); // State for storing reminders
  const [newReminder, submitNewReminder] = useState(''); // State for accepting new reminders
  const [reminderFor, setReminderFor] = useState('');
  const [remindAtTime, setRemindAtTime] = useState('');

  useEffect(() => {
    // Fetch reminders asynchronously
    const fetchReminders = async () => {
      await populateRemindersInLocalStorageFromServer();
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
        <TextInput
          style={{ height: 40, padding: 5, color: 'white' }}
          placeholder="CreateFor"
          placeholderTextColor="white"
          onChangeText={newReminderFor => setReminderFor(newReminderFor)}
          defaultValue={reminderFor}
        />
        <TextInput
          style={{ height: 40, padding: 5, color: 'white' }}
          placeholder="Reminder"
          placeholderTextColor="white"
          onChangeText={acceptNewReminder => submitNewReminder(acceptNewReminder)}
          defaultValue={newReminder}
        />
        <TextInput
          style={{ height: 40, padding: 5, color: 'white' }}
          placeholder="Time"
          placeholderTextColor="white"
          onChangeText={acceptNewRemindAtTime => setRemindAtTime(acceptNewRemindAtTime)}
          defaultValue={remindAtTime}
        />
        <BuddyButton theme="buddy" label="Submit" inputType='' input={newReminder} createFor={reminderFor} remindAtTime={remindAtTime} onPress={() => addReminder(newReminder, reminderFor, remindAtTime)} />
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
