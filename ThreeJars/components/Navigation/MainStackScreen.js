import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import JarsScreen from '../JarsScreen/JarsScreen';
import SettingsScreen from '../Settings/SettingsScreen';
import PaydaySettings from '../Settings/PaydaySettings';
import PaydayDateTimeSettings from '../Settings/PaydayDateTimeSettings';
import LogHistory from '../Settings/LogHistory';
import JarPercentages from '../Settings/JarPercentages';

const Stack = createStackNavigator();

const MainStackScreen = (props) => {
  const {
    spendJarValue,
    saveJarValue,
    shareJarValue,
    spendJarPercent,
    saveJarPercent,
    shareJarPercent,
    maxSpendJarPercent,
    maxSaveJarPercent,
    maxShareJarPercent,
    showJarPercentError,
    showJarPercentSuccess,
    showJarPercentCheck,
    paydayIsEnabled,
    paydayAmount,
    isSelectedPaydaySunday,
    isSelectedPaydayMonday,
    isSelectedPaydayTuesday,
    isSelectedPaydayWednesday,
    isSelectedPaydayThursday,
    isSelectedPaydayFriday,
    isSelectedPaydaySaturday,
    isSelectedPayday,
    isDisabledMinusButton,
    isDisabledAddButton,
    paydayTime,
    payDayPickerTime,
    logData,
    logDataFilter,
    handlePaydayOfTheWeek,
    handlePaydayTime,
    handleLogDataFilter,
    handlePaydayIsEnabled,
    handlePaydayAmount,
    handleJarPercentage,
    handleVerifyJarPercentage,
    handleActiveJar,
  } = props;

  return (
    <Stack.Navigator initialRouteName="Jars">
      <Stack.Screen
        name="ChoosePayday"
        // component={PaydayDateTimeSettings}
        options={{title: 'Payday Date & Time'}}>
        {(props) => (
          <PaydayDateTimeSettings
            {...props}
            isSelectedPaydaySunday={isSelectedPaydaySunday}
            isSelectedPaydayMonday={isSelectedPaydayMonday}
            isSelectedPaydayTuesday={isSelectedPaydayTuesday}
            isSelectedPaydayWednesday={isSelectedPaydayWednesday}
            isSelectedPaydayThursday={isSelectedPaydayThursday}
            isSelectedPaydayFriday={isSelectedPaydayFriday}
            isSelectedPaydaySaturday={isSelectedPaydaySaturday}
            handlePaydayOfTheWeek={handlePaydayOfTheWeek}
            handlePaydayTime={handlePaydayTime}
            payDayPickerTime={payDayPickerTime}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Jars"
        // component={JarsScreen}
        options={{
          headerShown: false,
        }}>
        {(props) => (
          <JarsScreen
            {...props}
            spendJarValue={spendJarValue}
            saveJarValue={saveJarValue}
            shareJarValue={shareJarValue}
            isDisabledMinusButton={isDisabledMinusButton}
            isDisabledAddButton={isDisabledAddButton}
            handleActiveJar={handleActiveJar}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Settings"
        // component={SettingsScreen}
        options={{title: 'Settings'}}>
        {(props) => (
          <SettingsScreen
            {...props}
            spendJarPercent={spendJarPercent}
            saveJarPercent={saveJarPercent}
            shareJarPercent={shareJarPercent}
            paydayIsEnabled={paydayIsEnabled}
            showJarPercentCheck={showJarPercentCheck}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LogHistory"
        // component={LogHistory}
        options={{title: 'Log History'}}>
        {(props) => (
          <LogHistory
            {...props}
            logData={logData}
            logDataFilter={logDataFilter}
            handleLogDataFilter={handleLogDataFilter}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Payday"
        // component={PaydaySettings}
        options={{title: 'Payday'}}>
        {(props) => (
          <PaydaySettings
            {...props}
            handlePaydayIsEnabled={handlePaydayIsEnabled}
            paydayIsEnabled={paydayIsEnabled}
            paydayAmount={paydayAmount}
            handlePaydayAmount={handlePaydayAmount}
            isSelectedPayday={isSelectedPayday}
            paydayTime={paydayTime}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="JarPercentages"
        // component={JarPercentages}
        options={{title: 'Jar Percentages'}}>
        {(props) => (
          <JarPercentages
            {...props}
            handleJarPercentage={handleJarPercentage}
            handleVerifyJarPercentage={handleVerifyJarPercentage}
            spendJarPercent={spendJarPercent}
            maxSpendJarPercent={maxSpendJarPercent}
            saveJarPercent={saveJarPercent}
            maxSaveJarPercent={maxSaveJarPercent}
            shareJarPercent={shareJarPercent}
            maxShareJarPercent={maxShareJarPercent}
            showJarPercentError={showJarPercentError}
            showJarPercentSuccess={showJarPercentSuccess}
            showJarPercentCheck={showJarPercentCheck}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

MainStackScreen.propTypes = {
  spendJarPercent: PropTypes.number,
  saveJarPercent: PropTypes.number,
  shareJarPercent: PropTypes.number,
  maxSpendJarPercent: PropTypes.number,
  maxSaveJarPercent: PropTypes.number,
  maxShareJarPercent: PropTypes.number,
  paydayIsEnabled: PropTypes.bool,
  isSelectedPaydaySunday: PropTypes.bool,
  isSelectedPaydayMonday: PropTypes.bool,
  isSelectedPaydayTuesday: PropTypes.bool,
  isSelectedPaydayWednesday: PropTypes.bool,
  isSelectedPaydayThursday: PropTypes.bool,
  isSelectedPaydayFriday: PropTypes.bool,
  isSelectedPaydaySaturday: PropTypes.bool,
  paydayAmount: PropTypes.string,
  isSelectedPayday: PropTypes.string,
  paydayTime: PropTypes.string,
  logDataFilter: PropTypes.string,
  payDayPickerTime: PropTypes.object,
  logData: PropTypes.array,
  handleJarPercentage: PropTypes.func,
  handleVerifyJarPercentage: PropTypes.func,
  handlePaydayIsEnabled: PropTypes.func,
  handlePaydayAmount: PropTypes.func,
  handleLogDataFilter: PropTypes.func,
  handlePaydayOfTheWeek: PropTypes.func,
  handlePaydayTime: PropTypes.func,
};

export default MainStackScreen;
