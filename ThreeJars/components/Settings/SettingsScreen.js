import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import WeeklyAllowanceSettings from './WeeklyAllowanceSettings';
import Log from './Log';
import ChildInitials from './ChildInitials';

const SettingsScreen = (props) => {
  // console.log('SettingsScreen props = ', props);
  return (
    <SafeAreaView>
      <WeeklyAllowanceSettings {...props} />
      <Log {...props} />
      <ChildInitials {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
