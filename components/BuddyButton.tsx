import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: string;
  inputType: string;
  input: string;
  createFor?: string,
  remindAtTime?: string,
  onPress: (inputType: string, input: string, createFor: string | undefined, remindAtTime: string | undefined) => void;
};

export default function BuddyButton({ label, theme, inputType, input, createFor, remindAtTime, onPress }: Props) {
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
          style={[styles.button, { backgroundColor: '#fff' }]} onPress={() => onPress(inputType, input, createFor, remindAtTime)}>
          <FontAwesome name="picture-o" size={8} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => onPress(inputType, input, createFor, remindAtTime)}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 120,
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