import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';

export interface ProjectTaskProps {
  id: string,
  name: string,
  description: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
  style?: any,
  onPress: () => void,
}

export function ProjectTaskComponent(props: ProjectTaskProps) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={[stylesheet.container, props.style]} testID={props.testID ?? "78:271"}>
        <Text style={stylesheet.text} testID="78:267">
          {props.name}
        </Text>
      </View>
    </Pressable>
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
});