import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TodoEntity from '../../../domain/entities/todo.entities';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 4,
    borderWidth: 2,
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  row_text_container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },

  row_title: {
    fontSize: 20,
    color: 'black',
  },

  row_description: {
    fontSize: 18,
  },

  row_check_container: {
    justifyContent: 'center',
  },

  row_check: {
    margin: 4,
  },
});

export type TodoItemProp = {
  item: TodoEntity;
  onChecked: (itemId: string, checked: boolean) => void;
};

const TodoItem = (prop: TodoItemProp) => {
  const {item, onChecked} = prop;
  const [checked, setChecked] = useState(item.isDone);

  useEffect(() => {
    console.log('TodoItem.useEffect', item.id, item.isDone, checked);
    onChecked(item.id, checked);
  }, [checked]);
  return (
    <View style={{...styles.row, borderColor: item.isDone ? 'purple' : 'pink'}}>
      <View style={styles.row_text_container}>
        <Text style={styles.row_title}>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.row_check_container}
        onPress={() => {
          setChecked(!checked);
        }}
        disabled={false}>
        <CheckBox
          style={styles.row_check}
          disabled={true}
          onCheckColor="purple"
          onTintColor="purple"
          tintColor="pink"
          value={item.isDone}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
