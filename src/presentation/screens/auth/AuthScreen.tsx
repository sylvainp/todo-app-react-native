import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const styles = StyleSheet.create({
  root: {flex: 1, flexDirection: 'column', paddingHorizontal: 8},
  segment_control: {
    height: 50,
    flexDirection: 'row',

    marginVertical: 4,
  },
  segment_tab_container: {
    borderRadius: 5,
    flex: 1,
    height: 50,
    marginHorizontal: 1,
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  segment_tab: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});

const segmentTab = (textString: string, onPress: () => void) => {
  return (
    <TouchableHighlight
      style={styles.segment_tab_container}
      onPress={onPress}
      underlayColor="pink">
      <Text style={{...styles.segment_tab}}>{textString}</Text>
    </TouchableHighlight>
  );
};

const AuthScreen = () => {
  const [index, setIndex] = useState(0);
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <View style={styles.segment_control}>
          {segmentTab("S'inscrire", () => setIndex(0))}
          {segmentTab('Se connecter', () => setIndex(1))}
        </View>
        {index === 0 && <RegisterScreen />}
        {index === 1 && <LoginScreen />}
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
