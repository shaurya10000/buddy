import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';

export interface ProjectTaskSubTaskProps {
  id: string,
  name: string,
  description: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
  style?: any,
  isTaskChecked?: boolean,
  onCheckChange: (checked: boolean) => void,
}

export function ProjectTaskSubTaskComponent(props: ProjectTaskSubTaskProps) {
  const [isChecked, setIsChecked] = useState(props.isTaskChecked);

  return (
    <View style={[stylesheet.container, props.style]} testID={props.testID ?? "78:271"}>
      <Text style={stylesheet.text} testID="78:267">
        {props.name}
      </Text>
      <View style={stylesheet.checkBoxContainer}>
        <CheckBox
          testID="78:269"
          checked={isChecked && props.isTaskChecked}
          onPress={() => {
            if (props.isTaskChecked) {
              const newCheckedState = !isChecked;
              setIsChecked(newCheckedState);
              props.onCheckChange(newCheckedState);
            }
          }}
        />
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    width: '75%',
    height: 32,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '20%',
    marginRight: '5%',
    overflow: 'scroll',
  },
  text: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});