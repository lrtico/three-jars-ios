import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class App extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.header__circle}>
            <Text style={styles.header__circle__name}>AJ</Text>
          </View>
          <Icon name="menu" size={45} style={styles.header__menu} />
        </View>
        <Text style={styles.sectionTitle}>Hello, world.</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    color: '#4a4a4a',
  },
  header: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  header__circle: {
    backgroundColor: 'white',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 72,
  },
  header__circle__name: {
    color: '#4A4A4A',
    fontSize: 30,
    fontWeight: 'bold',
  },
  header__menu: {
    color: '#4A4A4A',
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 1.5},
    shadowOpacity: 0.5,
    shadowRadius: 1.25,
    position: 'absolute',
    right: 18,
  },
});

export default App;
