import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';

export interface DraftProjectTaskProps {
  id: string,
  name: string,
  description: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
  style?: any,
  isChecked: boolean,
  onCheckChange: (checked: boolean) => void,
}

export function DraftProjectTaskComponent(props: DraftProjectTaskProps) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  return (
    <View style={[stylesheet.container, props.style]} testID={props.testID ?? "78:271"}>
      <Text style={stylesheet.text} testID="78:267">
        {props.name}
      </Text>
      <View style={stylesheet.checkBoxContainer}>
        <CheckBox
          testID="78:269"
          checked={isChecked}
          onPress={() => {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);
            props.onCheckChange(newCheckedState);
          }}
        />
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: 'darkgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    overflow: 'scroll',
    flexWrap: 'wrap', // Allow the container to wrap its content
  },
  text: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
    overflow: 'scroll',
    flexWrap: 'wrap', // Allow the text to wrap its content
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});