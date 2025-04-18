import { View, Text, StyleSheet, Pressable } from 'react-native';

export interface ProjectTaskSubTaskProps {
  id: string,
  name: string,
  description: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
  style?: any,
  isTaskChecked?: boolean,
  onPress: () => void,
}

export function ProjectTaskSubTaskComponent(props: ProjectTaskSubTaskProps) {
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
    width: '90%',
    height: 32,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
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