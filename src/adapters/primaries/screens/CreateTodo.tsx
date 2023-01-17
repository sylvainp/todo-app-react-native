import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'lightgray',
    margin: 4,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },

  text_input: {
    backgroundColor: 'white',
    height: 55,
    borderRadius: 5,
    paddingHorizontal: 4,
    fontSize: 22,
    flex: 9,
  },

  button_container: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    height: 55,
    marginLeft: 4,
  },

  button_text: {
    fontSize: 18,
    color: 'white',
  },
});

export type CreateTodoProp = {
  onCreateTodo: (title: string, description: string | null) => void;
};

const CreateTodo = (prop: CreateTodoProp) => {
  const {onCreateTodo} = prop;
  const [text, setText] = useState('');

  const onAddButtonPressed = (text: string) => {
    if (text.trim().length > 0) {
      onCreateTodo(text, null);
      setText('');
    }
  };
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.text_input}
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity
        style={styles.button_container}
        onPress={() => onAddButtonPressed(text)}>
        <Text style={styles.button_text}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTodo;
