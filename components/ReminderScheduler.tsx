import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from '@/components/RadioButton';
import { addReminder } from '@/components/UserInput';
import BuddyButton from '@/components/BuddyButton';

const daysOfWeek = [
  { label: 'S', value: 'Sunday' },
  { label: 'M', value: 'Monday' },
  { label: 'T', value: 'Tuesday' },
  { label: 'W', value: 'Wednesday' },
  { label: 'T', value: 'Thursday' },
  { label: 'F', value: 'Friday' },
  { label: 'S', value: 'Saturday' },
];

const ReminderScheduler = () => {
  const [dateWeb, setDateWeb] = useState(String);
  const [startDateWeb, setStartDateWeb] = useState(String);
  const [endDateWeb, setEndDateWeb] = useState(String);
  const [timeWeb, setTimeWeb] = useState(String);

  const [dateMobile, setDateMobile] = useState(new Date());
  const [timeMobile, setTimeMobile] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDateMobile, setStartDateMobile] = useState(new Date());
  const [endDateMobile, setEndDateMobile] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isRepetitive, setIsRepetitive] = useState(false);
  const [newReminder, submitNewReminder] = useState(''); // State for accepting new reminders
  const [reminderFor, setReminderFor] = useState('');


  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  return (
    <View>
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
      <View style={styles.radioContainer}>
        <RadioButton
          value="single"
          selectedValue={isRepetitive ? 'repeat' : 'single'}
          onPress={(value) => setIsRepetitive(value === 'repeat')}
          label={<Text style={{ color: 'white' }}>Single Reminder</Text>}
        />
        <RadioButton
          value="repeat"
          selectedValue={isRepetitive ? 'repeat' : 'single'}
          onPress={(value) => setIsRepetitive(value === 'repeat')}
          label={<Text style={{ color: 'white' }}>Repeat Reminder</Text>}
        />
      </View>

      {isRepetitive ? (
        <>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day.value}
                style={[
                  styles.dayButton,
                  selectedDays.includes(day.value) && styles.selectedDayButton,
                  { backgroundColor: selectedDays.includes(day.value) ? 'blue' : 'transparent', borderColor: 'white', borderWidth: 1 },
                ]}
                onPress={() => toggleDaySelection(day.value)}
              >
                <Text style={styles.dayButtonText}>{day.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {Platform.OS === 'web' ? (
            <>
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Start Date (YYYY-MM-DD)"
                placeholderTextColor="white"
                value={startDateWeb}
                editable={true}
                onChangeText={(newStartDate) => setStartDateWeb(newStartDate)}
              />
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="End Date (YYYY-MM-DD)"
                placeholderTextColor="white"
                value={endDateWeb}
                editable={true}
                onChangeText={(newEndDate) => setEndDateWeb(newEndDate)}
              />
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Time (HH:MM)"
                placeholderTextColor="white"
                value={timeWeb}
                editable={true}
                onChangeText={(newTime) => setTimeWeb(newTime)}
              />
            </>
          ) : (
            <>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, color: 'white' }]}
                  placeholder="Start Date"
                  placeholderTextColor="white"
                  value={startDateMobile.toLocaleDateString()}
                  editable={false}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Start Date" onPress={() => setShowDatePicker(true)} />
                </View>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={startDateMobile}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setStartDateMobile(selectedDate);
                  }}
                />
              )}

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, color: 'white' }]}
                  placeholder="End Date"
                  placeholderTextColor="white"
                  value={endDateMobile.toLocaleDateString()}
                  editable={false}
                />
                <View style={styles.buttonContainer}>
                  <Button title="End Date" onPress={() => setShowEndDatePicker(true)} />
                </View>
              </View>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDateMobile}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEndDatePicker(false);
                    if (selectedDate) setEndDateMobile(selectedDate);
                  }}
                />
              )}

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, color: 'white' }]}
                  placeholder="Time (HH:MM)"
                  placeholderTextColor="white"
                  value={timeMobile.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  editable={false}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Time" onPress={() => setShowTimePicker(true)} />
                </View>
              </View>
              {showTimePicker && (
                <DateTimePicker
                  value={timeMobile}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setTimeMobile(selectedTime);
                  }}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {Platform.OS === 'web' ? (
            <>
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Date (YYYY-MM-DD)"
                placeholderTextColor="white"
                value={dateWeb}
                editable={true}
                onChangeText={(newDate) => {
                  setDateWeb(newDate);
                }}
              />
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Time (HH:MM)"
                placeholderTextColor="white"
                value={timeWeb}
                editable={true}
                onChangeText={(newTime) => {
                  setTimeWeb(newTime);
                }}
              />
            </>
          ) : (
            <>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, color: 'white' }]}
                  placeholder="Date"
                  placeholderTextColor="white"
                  onFocus={() => setShowDatePicker(true)}
                  value={dateMobile.toLocaleDateString()}
                  editable={false}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Date" onPress={() => setShowDatePicker(true)} />
                </View>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={dateMobile}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDateMobile(selectedDate);
                  }}
                />
              )}

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, color: 'white' }]}
                  placeholder="Time (HH:MM)"
                  placeholderTextColor="white"
                  onFocus={() => setShowTimePicker(true)}
                  value={timeMobile.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  editable={false}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Time" onPress={() => setShowTimePicker(true)} />
                </View>
              </View>
              {showTimePicker && (
                <DateTimePicker
                  value={timeMobile}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setTimeMobile(selectedTime);
                  }}
                />
              )}
            </>
          )}
        </>
      )}
      <BuddyButton
        theme="buddy"
        label="Set Reminder"
        inputType='reminder'
        input={newReminder}
        createFor={reminderFor}
        remindAtTime={Platform.OS === 'web' ? new Date(new Date().setHours(parseInt(timeWeb.split(':')[0]), parseInt(timeWeb.split(':')[1]))) : timeMobile}
        isRepetitive={isRepetitive}
        startDate={Platform.OS === 'web' ? (startDateWeb ? new Date(startDateWeb) : undefined) : (startDateMobile ? startDateMobile : undefined)}
        endDate={Platform.OS === 'web' ? (endDateWeb ? new Date(endDateWeb) : undefined) : (endDateMobile ? endDateMobile : undefined)}
        remindAtDate={Platform.OS === 'web' ? (dateWeb ? new Date(dateWeb) : undefined) : (dateMobile ? dateMobile : undefined)}
        selectedDays={selectedDays}
        onPress={(inputType, input, createFor, remindAtTime, startDate, endDate, remindAtDate) => addReminder(input, createFor, remindAtTime, isRepetitive, startDate, endDate, remindAtDate, selectedDays)}
      />
      {/* <BuddyButton theme="buddy" label="Submit" inputType='' input={newReminder} createFor={reminderFor} remindAtTime={remindAtTime} onPress={() => addReminder(newReminder, reminderFor, remindAtTime, isRepetitive, startDate, endDate, remindAtDate)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dayButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  selectedDayButton: {
    backgroundColor: '#4CAF50',
  },
  dayButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    width: 100, // Set a fixed width for all buttons
    justifyContent: 'center',
  },
});

export { ReminderScheduler };