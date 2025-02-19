import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from './RadioButton';

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
  const [date, setDate] = useState(String);
  const [dateMobile, setDateMobile] = useState(new Date());
  const [time, setTime] = useState(String);
  const [timeMobile, setTimeMobile] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isRepetitive, setIsRepetitive] = useState(false);
  const [startDate, setStartDate] = useState(String);
  const [endDate, setEndDate] = useState(String);
  const [startDateMobile, setStartDateMobile] = useState(new Date());
  const [endDateMobile, setEndDateMobile] = useState(new Date());

  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSchedule = () => {
    console.log('Scheduled reminder:', {
      date,
      time,
      selectedDays,
      isRepetitive,
      startDate,
      endDate,
    });
  };

  return (
    <View>
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
                value={startDate}
                onChangeText={(newStartDate) => setStartDate(newStartDate)}
              />
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="End Date (YYYY-MM-DD)"
                placeholderTextColor="white"
                value={endDate}
                onChangeText={(newEndDate) => setEndDate(newEndDate)}
              />
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Time (HH:MM)"
                placeholderTextColor="white"
                value={time}
                onChangeText={(newTime) => setTime(newTime)}
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
                  placeholder="Time"
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
                value={date.toString().substring(0, 10)}
                onFocus={() => setShowDatePicker(true)}
                onChangeText={(newDate) => {
                  setDate(newDate);
                }}
              />
              <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Time"
                placeholderTextColor="white"
                value={time.toString()}
                onFocus={() => setShowTimePicker(true)}
                onChangeText={(newTime) => {
                  setTime(newTime);
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
                  placeholder="Time"
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
      )}
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