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
    spendJarPercent,
    saveJarPercent,
    shareJarPercent,
    maxSpendJarPercent,
    maxSaveJarPercent,
    maxShareJarPercent,
    showJarPercentError,
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
        component={JarsScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="JarAdd" options={{headerShown: false}}>
            {(props) => <JarAdd />}
          </Stack.Screen> */}
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
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

MainStackScreen.propTypes = {};

export default MainStackScreen;
