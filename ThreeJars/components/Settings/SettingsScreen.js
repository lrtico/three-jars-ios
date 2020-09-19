import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import WeeklyAllowanceSettings from './WeeklyAllowanceSettings';
import Log from './Log';

const SettingsScreen = (props) => {
  return (
    <SafeAreaView>
      <WeeklyAllowanceSettings {...props} />
      <Log {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
