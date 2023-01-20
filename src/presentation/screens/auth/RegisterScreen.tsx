import React, {useReducer, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import useAuth from '../../hooks/useAuth.hook';

const RegisterScreen = () => {
  type formField = {
    email: string;
    familyName: string;
    givenName: string;
    password: string;
  };
  const {register, authError, authSuccess} = useAuth();
  const [form, updateForm] = useReducer(
    (prev: formField, next: any) => {
      const response: formField = {...prev, ...next};
      return response;
    },
    {
      email: '',
      familyName: '',
      givenName: '',
      password: '',
    },
  );

  const isButtonDisabled = (form: formField): boolean => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      return true;
    }
    if (form.password.length < 5) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.root}>
      <TextInput
        placeholderTextColor={'pink'}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={text => updateForm({email: text})}
      />
      <TextInput
        placeholderTextColor={'pink'}
        clearButtonMode="while-editing"
        style={styles.input}
        placeholder="Nom"
        value={form.familyName}
        onChangeText={text => updateForm({familyName: text})}
      />
      <TextInput
        placeholderTextColor={'pink'}
        clearButtonMode="while-editing"
        style={styles.input}
        placeholder="Prénom"
        value={form.givenName}
        onChangeText={text => updateForm({givenName: text})}
      />
      <TextInput
        placeholderTextColor={'pink'}
        clearButtonMode="while-editing"
        style={styles.input}
        placeholder="Mot de passe"
        clearTextOnFocus={true}
        secureTextEntry={true}
        value={form.password}
        onChangeText={text => updateForm({password: text})}
      />
      <TouchableHighlight
        disabled={isButtonDisabled(form)}
        underlayColor={'lightgrey '}
        style={styles.button_container}
        onPress={() => register(form)}>
        <Text style={styles.button_label}>Créer un compte</Text>
      </TouchableHighlight>
      {authError && <Text style={styles.error_text}>{authError}</Text>}
      {authSuccess && <Text style={styles.success_text}>{authSuccess}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'purple',
    height: '100%',
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

  error_text: {
    fontSize: 22,
    color: 'red',
    textAlign: 'center',
  },
  success_text: {
    fontSize: 22,
    color: 'pink',
    textAlign: 'center',
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
});

export default RegisterScreen;
