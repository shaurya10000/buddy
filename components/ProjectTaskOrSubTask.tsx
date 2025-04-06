import {View, Text, StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';
import React from 'react';

export interface ProjectTaskOrSubTaskProps {
  id: string,
  name: string,
  description: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function ProjectTaskOrSubTask(props: ProjectTaskOrSubTaskProps) {
  return (
    <View style={stylesheet.root} testID={props.testID ?? "78:271"}>
      <View style={stylesheet.rectangle5} testID="78:266"/>
      <Text style={stylesheet.subTask1} testID="78:267">
        {props.name}
      </Text>
      <CheckBox testID="78:269"/>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  root: {
    width: 608,
    height: 32,
    flexShrink: 0,
  },
  rectangle5: {
    width: 608,
    height: 32,
    flexShrink: 0,
  },
  subTask1: {
    width: 64.156,
    height: 16,
    flexShrink: 0,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});