import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BuddyButton from '@/components/BuddyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const goOverHistory = async () => {
    try {
        let keyIndex: number = 0;
        const value = await AsyncStorage.getItem('last-key-index');
        if (value === null) {
            console.log('Nothing found in user input history');
        } else {
            keyIndex = parseInt(value);
            for (let i = 0; i <= keyIndex; i++) {
                const key = `userInput-${i}`
                let value = await AsyncStorage.getItem(key);
                console.log(`userInput-${i} = '${value}'`);
                // alert(`userInput-${i} = '${value}'`);
            }
        }
    } catch (e) {
        // saving error
    }
}

type InputObject = {
    key: string;
    value: string;
};

const getItems = async (itemType: string) => {
    const items: InputObject[] = [];

    console.log(`Trying to load ${itemType}s`);

    try {
        let keyIndex: number = 0;
        let value = await AsyncStorage.getItem(`last-key-index-${itemType}`);
        if (value === null) {
            console.log('Nothing found in user input history');
        } else {
            console.log(`Found some ${itemType}`);
            keyIndex = parseInt(value);
            for (let i = 0; i <= keyIndex; i++) {
                const key = `${itemType}-${i}`
                value = await AsyncStorage.getItem(key) ?? '#ERROR';
                console.log(`${itemType}-${i} = '${value}'`);
                items.push({ key, value });
            }
        }

    } catch (e) {
        // saving error
    }

    return items;
}

// TODO
// 1. Hit Open AI APIs to categorize the input and place it inside appropriate storage on backend.
// 2. If someone has not bought the paid plan with backend then classify and save in local storage itself.
// 3. People with paid versions only can have access across different platforms else their app will just store the data locally and act in a silo.
//
// Below is local storage implementation only
const storeTuple = async (text: string, inputType?: string) => {
    let keyIndex: number = 0;
    let keyIndexKey: string = 'last-key-index';
    if (inputType !== undefined) {
        keyIndexKey = `last-key-index-${inputType}`;
    }
    try {
        const value = await AsyncStorage.getItem(keyIndexKey);
        if (value !== null) {
            keyIndex = parseInt(value) + 1;
        }

        await addItem(keyIndex, inputType, text);
        await AsyncStorage.setItem(keyIndexKey, `${keyIndex}`);
    } catch (e) {
        // saving error
    }

    goOverHistory();
};

const restEndpoint = "http://localhost:8080/task";

const postTuple = async (text: string, inputType?: string) => {
    const body: string = `{ "userId": "99b78426-1221-4a62-8896-49a0e56b2af3", "title": "${text}", "description": "Description for - ${text}"}`;
    try {
        console.log(`Try to post ${inputType} to server`);
        const response = await fetch(restEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        });

        if (response.status != 201) {
            throw new Error('Unknown exception');
        }

        const jsonResponse = await response.json();
        console.log('Post response from server -', jsonResponse);
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const resetInputType = async (inputType?: string) => {
    let keyIndex: number = 0;
    let keyIndexKey: string = 'last-key-index';
    if (inputType === undefined) {
        throw new Error('Invalid inputType');
    }

    keyIndexKey = `last-key-index-${inputType}`;

    try {
        keyIndex = await getKeyIndex(keyIndexKey, 0);

        for (let i = 0; i <= keyIndex; i++) {
            console.log(`Removing from localstorage - ${inputType}${i}`);

            await removeItem(inputType + i);
        }
        await AsyncStorage.removeItem(keyIndexKey);
    } catch (e) {
        // reset error
    }
};

const resetAndStoreTuples = async (tuples: string[], inputType?: string) => {
    let keyIndex: number = 0;
    let keyIndexKey: string = 'last-key-index';

    resetInputType(inputType);
    if (inputType !== undefined) {
        keyIndexKey = `last-key-index-${inputType}`;
    }

    try {
        keyIndex = await getKeyIndex(keyIndexKey, 0);

        for (let i = 0; i < tuples.length; i++) {
            console.log(`Saving in localstorage - ${tuples[i]}`);
            keyIndex = await getKeyIndex(keyIndexKey, 0);

            await addItem(keyIndex, inputType, tuples[i]);
            await AsyncStorage.setItem(keyIndexKey, `${i}`);
        }
    } catch (e) {
        // saving error
    }
};

/**
 * 
 * User itself can classify its input to be of the following types -
 * 1. Reminder
 * 2. Shopping list item
 * 3. Note / Thought - This will trigger further GenAI on the thought entered to find out similar / opposite thoughts
 *    noted earlier and just try to connect the dots
 * 4. Learning / Lesson
 * 5. Check-in - where the app can start and you can log something upon being asked - it is a tapered down version
 *    of reminder
 * 6. Grocery
 * 
 * That's all. Need to keep it simple like communicating on whatsapp and be reminded whenever required
 * Can read back what I was required to buy, what am I required to do, what needs attention
 * 
 * e.g. it can have location access and when inside a grocery store then this app can display the shopping list on the home screen
 * 
 * Notification preferences will be - when phone / laptop is being used continuously vs on a break vs just return and start the laptop
 * 
 * Reminders don't have a fixed time rather 1 day / 1 week / 1 month / 1 year
 * 
 * This can further be evolved into an app which couples / parents
 * / people living together / family uses to track its tasks for each person and people able to schedule tasks for the other person.
 * 
 * It might not be parallel to whatsapp but a smaller version which is focussed specifically on personal assistance.
 * 
 */
const inputText = () => {
    const [text, setText] = useState('');

    const submitUserInputText = async () => {
        storeTuple(text);
        alert(`You entered: ${text}`);
    };

    const addTask = async () => {
        storeTuple(text, 'task');
        alert(`Add: ${text}`);
        postTuple(text, 'task');
    };

    const setReminder = async () => {
        storeTuple(text, 'reminder');
        alert(`Remind for: ${text}`);
    };

    const addToShoppingList = async () => {
        storeTuple(text, 'shopping');
        alert(`Shop for: ${text}`);
    };

    const addToGroceryList = async () => {
        storeTuple(text, 'grocery');
        alert(`Shop for: ${text}`);
    };

    const createNote = async () => {
        storeTuple(text, 'note');
        alert(`Note: ${text}`);
    };

    const setcheckIn = async () => {
        storeTuple(text, 'checkin');
        alert(`Check-in for: ${text}`);
    };

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{ height: 40, padding: 5, color: 'white' }}
                placeholder="Type here!"
                placeholderTextColor="white"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />
            <BuddyButton theme="buddy" label="Submit" inputType='' onPress={submitUserInputText} />
            <BuddyButton theme="buddy" label="Task" inputType='' onPress={addTask} />
            <BuddyButton theme="buddy" label="Remind" inputType='' onPress={setReminder} />
            <BuddyButton theme="buddy" label="Grocery" inputType='' onPress={addToGroceryList} />
            <BuddyButton theme="buddy" label="Note" inputType='' onPress={createNote} />
            <BuddyButton theme="buddy" label="Check-in" inputType='' onPress={setcheckIn} />
        </View>
    );
};

async function getKeyIndex(keyIndexKey: string, keyIndex: number) {
    const value = await AsyncStorage.getItem(keyIndexKey);
    if (value !== null) {
        return parseInt(value) + 1;
    }
    return keyIndex;
}

async function addItem(keyIndex: number, inputType: string | undefined, text: string) {
    let key: string = `userInput-${keyIndex}`;
    if (inputType !== undefined) {
        key = `${inputType}-${keyIndex}`;
    }

    await AsyncStorage.setItem(key, text);
}

async function removeItem(key: string) {
    await AsyncStorage.removeItem(key);
}

export {
    inputText,
    getItems,
    resetAndStoreTuples as storeTuples,
    InputObject
};
