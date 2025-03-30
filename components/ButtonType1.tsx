import {View, Text, StyleSheet, Pressable} from 'react-native';

export interface ButtonType1Props {
  displayText: string,
  style?: any,
  onPress: () => void,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function ButtonType1(props: ButtonType1Props) {
  return (
    <Pressable onPress={props.onPress} style={[styles.box, props.style]} testID={props.testID ?? "70:246"}>
      <Text style={styles.text} testID="70:232">
        {props.displayText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    flexShrink: 0,
    backgroundColor: 'rgba(234, 214, 214, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.250980406999588)',
    shadowRadius: 4,
    shadowOffset: {"width":0,"height":4},
  },
  text: {
    left: '50%',
    top: '50%',
    transform: [
      { translateX: '-50%' },
      { translateY: '-50%' }
    ],
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
