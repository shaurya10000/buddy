import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: string;
  inputType: string;
  input: string;
  createFor?: string,
  remindAtTime?: Date,
  isRepetitive: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  remindAtDate: Date | undefined;
  selectedDays: string[];
  onPress: (inputType: string, input: string, createFor: string | undefined, remindAtTime: Date | undefined, startDate: Date | undefined, endDate: Date | undefined, remindAtDate: Date | undefined, selectedDays: string[]) => void;
};

export default function BuddyButton({ label, theme, inputType, input, createFor, remindAtTime, isRepetitive, startDate, endDate, remindAtDate, selectedDays, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]} onPress={() => onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'buddy') {
    return (
      <View
        style={[
          styles.buttonContainer,
          // { borderWidth: 1, borderColor: '#ffd33d', borderRadius: 8 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]} onPress={() => onPress(inputType, input, createFor, remindAtTime, startDate, endDate, remindAtDate, selectedDays)}>
          <FontAwesome name="picture-o" size={8} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => onPress(inputType, input, createFor, remindAtTime, startDate, endDate, remindAtDate, selectedDays)}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // width: 120,
    width: 'auto',
    height: 34,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});