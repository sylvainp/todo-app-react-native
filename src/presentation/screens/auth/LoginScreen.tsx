import React, {useReducer} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import useAuth from '../../hooks/useAuth.hook';
const styles = StyleSheet.create({
  root: {
    // flex: 1,
  },

  input: {
    fontSize: 22,
    padding: 4,
    height: 40,
    marginVertical: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 5,
    color: 'purple',
  },

  button_container: {
    backgroundColor: 'purple',
    height: 40,
    marginVertical: 8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  button_label: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
  },

  error_container: {
    height: 40,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  error_text: {
    fontSize: 22,
    color: 'red',
    textAlign: 'center',
  },
});
const LoginScreen = () => {
  const {authError, login} = useAuth();
  const [form, updateForm] = useReducer(
    (prev: any, next: any) => {
      return {...prev, ...next};
    },
    {
      username: '',
      password: '',
    },
  );

  return (
    <View style={styles.root}>
      <TextInput
        placeholderTextColor={'pink'}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        style={styles.input}
        placeholder="Email"
        value={form.username}
        onChangeText={text => updateForm({username: text})}
      />
      <TextInput
        placeholderTextColor={'pink'}
        clearTextOnFocus={true}
        clearButtonMode="while-editing"
        style={styles.input}
        secureTextEntry={true}
        placeholder="Mot de passe"
        value={form.password}
        onChangeText={text => updateForm({password: text})}
      />

      <TouchableHighlight
        underlayColor={'lightgrey '}
        style={styles.button_container}
        onPress={() => login(form)}>
        <Text style={styles.button_label}>Se connecter</Text>
      </TouchableHighlight>
      {authError && (
        <View style={styles.error_container}>
          <Text style={styles.error_text}>{authError}</Text>
        </View>
      )}
    </View>
  );
};
export default LoginScreen;
