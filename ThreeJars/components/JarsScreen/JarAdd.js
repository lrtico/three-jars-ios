import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const JarAdd = (props) => {
  console.log('JarAdd props = ', props);
  return (
    <SafeAreaView>
      <View>
        <Text>Hello, jar add.</Text>
      </View>
    </SafeAreaView>
  );
};

JarAdd.propTypes = {};

export default JarAdd;
