import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';

export interface ProjectTaskProps {
  id: string,
  name: string,
  description: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
  style?: any,
  isChecked?: boolean,
  onCheckChange?: (checked: boolean) => void,
}

export function ProjectTaskComponent(props: ProjectTaskProps) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  return (
    <View style={[stylesheet.container, props.style]} testID={props.testID ?? "78:271"}>
      <Text style={stylesheet.text} testID="78:267">
        {props.name}
      </Text>
      <CheckBox
        testID="78:269"
        checked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
          props.onCheckChange(!isChecked);
        }}
      />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    width: '80%',
    height: 32,
    backgroundColor: 'darkgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%'
  },
  text: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
  },
});