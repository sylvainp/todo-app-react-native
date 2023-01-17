import React from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import useTodo from '../hooks/useTodo.hook';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
const MainScreen = () => {
  const {todos, addTodo, markTodoDone, isLoading} = useTodo();
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <View style={{height: 80}}>
          <CreateTodo onCreateTodo={addTodo} />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isLoading}
          onRequestClose={() => {}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator />
            </View>
          </View>
        </Modal>
        <TodoList todos={todos} markTodoDone={markTodoDone} />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
