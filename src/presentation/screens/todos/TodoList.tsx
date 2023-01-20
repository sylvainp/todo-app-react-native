import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TodoEntity from '../../../domain/entities/todo.entities';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  list: {},
});

export type TodoListProp = {
  todos: TodoEntity[];
  markTodoDone: (todoId: string, done: boolean) => void;
};
const TodoList = (props: TodoListProp) => {
  const {todos, markTodoDone} = props;
  const onChecked = (itemId: string, checked: boolean) => {
    markTodoDone(itemId, checked);
  };

  const renderItem = ({item}: any) => (
    <TodoItem item={item} onChecked={onChecked} />
  );
  return <FlatList style={styles.list} data={todos} renderItem={renderItem} />;
};

export default TodoList;
