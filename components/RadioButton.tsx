import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RadioButtonProps = {
  value: string;
  selectedValue: string;
  onPress: (value: string) => void;
  label: ReactNode;
};

const RadioButton: React.FC<RadioButtonProps> = ({ value, selectedValue, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, selectedValue === value && styles.selectedRadioCircle]} />
      {label}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
  },
});

export default RadioButton; 