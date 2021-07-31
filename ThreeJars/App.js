import 'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import BackgroundFetch, {
  BackgroundFetchStatus,
} from 'react-native-background-fetch';
import SendSMS from 'react-native-sms';
import JarAdd from './components/JarsScreen/JarAdd';
import JarMinus from './components/JarsScreen/JarMinus';
import MainStackScreen from './components/Navigation/MainStackScreen';
import {concat} from 'react-native-reanimated';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class App extends Component {
  state = {
    spendJarPercent: 50,
    maxSpendJarPercent: 100,
    saveJarPercent: 40,
    maxSaveJarPercent: 100,
    shareJarPercent: 10,
    maxShareJarPercent: 100,
    showJarPercentError: false,
    showJarPercentSuccess: true,
    showJarPercentCheck: false,
    paydayIsEnabled: true,
    isDisabledPaydayManually: false,
    showPaydayManuallyModal: false,
    paydayAmount: '5',
    isSelectedPayday: 'Saturday',
    isSelectedPaydaySunday: false,
    isSelectedPaydayMonday: false,
    isSelectedPaydayTuesday: false,
    isSelectedPaydayWednesday: false,
    isSelectedPaydayThursday: false,
    isSelectedPaydayFriday: false,
    isSelectedPaydaySaturday: true,
    paydayTime: '12:00 PM',
    payDayPickerTime: new Date(),
    logDataFilter: '',
    logData: [],
    filteredLogData: [],
    activeJar: '',
    spendJarValue: 0,
    spendJarIncomingValue: 0,
    spendJarNote: '',
    spendJarNewValue: 0,
    spendJarOldValue: 0,
    saveJarValue: 0,
    saveJarIncomingValue: 0,
    saveJarNote: '',
    saveJarNewValue: 0,
    saveJarOldValue: 0,
    shareJarValue: 0,
    shareJarIncomingValue: 0,
    shareJarNote: '',
    shareJarNewValue: 0,
    shareJarOldValue: 0,
    isDisabledMinusButton: true,
    isDisabledAddButton: true,
    childsInitials: '',
    paydaySMSNumber: '',
    isPaid: false,
  };

  componentDidMount() {
    // console.log('componentDidMount go now');
    // AsyncStorage.setItem('@Jars_spendJarValue', '3');
    this.loadJarValue();
    this.loadPaydaySettingsIsEnabled();
    this.loadPaydaySettingsAmount();
    this.loadPaydaySettingsTime();
    this.loadPaydaySettingsDay();
    this.loadJarPercent();
    this.loadChildsInitials();
    this.loadIsPaid();
    this.loadPaydaySMSNumber();
    this.makeInit();
    // AsyncStorage.clear();
  }

  scheduleTask = async (name) => {
    console.log('[BackgroundFetch] scheduleTask fired');
    try {
      await BackgroundFetch.scheduleTask({
        taskId: name,
        stopOnTerminate: false,
        enableHeadless: true,
        delay: 10000, // milliseconds (5s)
        forceAlarmManager: true, // more precise timing with AlarmManager vs default JobScheduler
        periodic: false, // Fire once only.
      });
    } catch (e) {
      console.warn('[BackgroundFetch] scheduleTask fail', e);
    }
  };

  /// BackgroundFetch event-handler.
  /// All events from the plugin arrive here, including #scheduleTask events.
  ///
  onBackgroundFetchEvent = async (taskId) => {
    console.log('[BackgroundFetch] Event received: ', taskId);

    if (taskId === 'react-native-background-fetch') {
      // Test initiating a #scheduleTask when the periodic fetch event is received.
      console.log(
        '[onBackgroundFetchEvent] fired with taskId react-native-background-fetch',
      );

      const today = new Date();
      const dayOfTheWeek = today.getDay();
      const {isPaid, isSelectedPayday} = this.state;
      let payday = 7;

      switch (isSelectedPayday) {
        case 'Sunday':
          payday = 0;
          console.log(
            'Stored pay day = Sunday so background fetch payday = ',
            payday,
          );
          break;
        case 'Monday':
          payday = 1;
          console.log(
            'Stored pay day = Monday so background fetch payday = ',
            payday,
          );
          break;
        case 'Tuesday':
          payday = 2;
          console.log(
            'Stored pay day = Tuesday so background fetch payday = ',
            payday,
          );
          break;
        case 'Wednesday':
          payday = 3;
          console.log(
            'Stored pay day = Wednesday so background fetch payday = ',
            payday,
          );
          break;
        case 'Thursday':
          payday = 4;
          console.log(
            'Stored pay day = Thursday so background fetch payday = ',
            payday,
          );
          break;
        case 'Friday':
          payday = 5;
          console.log(
            'Stored pay day = Friday so background fetch payday = ',
            payday,
          );
          break;
        case 'Saturday':
          payday = 6;
          console.log(
            'Stored pay day = Saturday so background fetch payday = ',
            payday,
          );
          break;
        default:
          payday = 7;
          break;
      }

      console.log(
        'after background fetch payday switch, isSelectedPayday = ',
        payday,
      );

      if (dayOfTheWeek === payday) {
        console.log(
          `today is the ${dayOfTheWeek} of the week and the date is ${today} which means it's payday`,
        );
        if (!isPaid) {
          console.log(
            `isPaid is false so add the payday amounts to the three jars and set isPaid to true.`,
          );
          this.setPaydayManually();
          this.setState({isPaid: true});
          this.storeIsPaid('true');
        } else {
          console.log(`isPaid test is true, the jars have already been paid`);
          return false;
        }
      } else {
        console.log(
          `today is not the set payday (${dayOfTheWeek}) of the week and the date is ${today}`,
        );
        this.setState({isPaid: false});
      }
      try {
        await this.scheduleTask('com.transistorsoft.customtask');
      } catch (e) {
        console.warn('[BackgroundFetch] scheduleTask falied', e);
      }
    }

    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    BackgroundFetch.finish(taskId);
  };

  /// Configure BackgroundFetch
  ///
  makeInit = async () => {
    console.log('makeInit fired');
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      this.onBackgroundFetchEvent,
      (status) => {
        setDefaultStatus(statusToString(status));
        console.log('[BackgroundFetch] status', statusToString(status), status);
      },
    );
  };

  storeJarValue = async (jar, value, logs) => {
    const val = value.toString();
    const logHistory = JSON.stringify(logs);

    switch (jar) {
      case 'spend':
        AsyncStorage.setItem('@Jars_spendJarValue', val);
        break;
      case 'save':
        AsyncStorage.setItem('@Jars_saveJarValue', val);
        break;
      case 'share':
        AsyncStorage.setItem('@Jars_shareJarValue', val);
        break;
    }
    AsyncStorage.setItem('@Jars_log', logHistory);
  };

  loadJarValue = async () => {
    // console.log('readJarValue go now!');
    try {
      const spendValue = await AsyncStorage.getItem('@Jars_spendJarValue');
      const saveValue = await AsyncStorage.getItem('@Jars_saveJarValue');
      const shareValue = await AsyncStorage.getItem('@Jars_shareJarValue');
      const logs = await AsyncStorage.getItem('@Jars_log');

      if (spendValue !== null && logs !== null) {
        const spendVal = parseFloat(spendValue);
        let saveVal = 0;
        let shareVal = 0;
        const logParsed = JSON.parse(logs);
        saveValue === null ? (saveVal = 0) : (saveVal = parseFloat(saveValue));
        shareValue === null
          ? (shareVal = 0)
          : (shareVal = parseFloat(shareValue));
        console.log(
          'Fetched data from AsyncStorage @Jars_saveJarValue',
          saveVal,
        );
        this.setState({
          spendJarValue: spendVal,
          saveJarValue: saveVal,
          shareJarValue: shareVal,
          logData: logParsed,
          filteredLogData: logParsed,
        });
      } else {
        console.log(
          'No data in AsyncStorage @Jars_saveJarValue',
          spendValue,
          saveValue,
          shareValue,
          logs,
        );
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage @Jars_saveJarValue', error);
    }
  };

  storePaydaySettingsIsEnabled = async (enabled) => {
    console.log('storePaydaySettingsIsEnabled go now!', enabled);
    const payDayEnabled = enabled === true ? 'true' : 'false';
    AsyncStorage.setItem('@Jars_payDayIsEnabled', payDayEnabled);
    // AsyncStorage.setItem('@Jars_payDayAmount', amount);
    this.storePaydaySettingsAmount(this.state.paydayAmount);
  };

  loadPaydaySettingsIsEnabled = async () => {
    // console.log('loadPaydaySettings go now!');
    try {
      const isEnabled = await AsyncStorage.getItem('@Jars_payDayIsEnabled');
      const isEnabledBoolean = isEnabled === 'true' ? true : false;
      if (isEnabledBoolean !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_payDayIsEnabled',
          isEnabledBoolean,
        );
        this.setState({
          paydayIsEnabled: isEnabledBoolean,
        });
      } else {
        console.log('No data in AsyncStorage key', isEnabledBoolean);
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage', error);
    }
  };

  storePaydaySettingsAmount = async (amount) => {
    console.log('storePaydaySettingsAmount go now!', amount);
    AsyncStorage.setItem('@Jars_payDayAmount', amount);
  };

  storeIsPaid = async (arg) => {
    console.log('storeIsPaid go now and make isPaid', arg);
    const isPaidString = arg === true ? 'true' : 'false';
    AsyncStorage.setItem('@Jars_isPaid', arg);
  };

  loadIsPaid = async () => {
    console.log('loadIsPaid go now!');
    try {
      const isPaidVal = await AsyncStorage.getItem('@Jars_isPaid');
      const isPaidBoolean = isPaidVal === 'true' ? true : false;
      if (isPaidBoolean !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_isPaid',
          isPaidBoolean,
        );
        this.setState({
          isPaid: isPaidBoolean,
        });
      } else {
        console.log('No data in AsyncStorage @Jars_isPaid', isPaidBoolean);
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage @Jars_isPaid', error);
    }
  };

  loadPaydaySettingsAmount = async () => {
    // console.log('loadPaydaySettingsAmount go now!');
    try {
      const paydayStoredAmount = await AsyncStorage.getItem(
        '@Jars_payDayAmount',
      );
      if (paydayStoredAmount !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_payDayAmount',
          paydayStoredAmount,
        );
        this.setState({
          paydayAmount: paydayStoredAmount,
        });
      } else {
        console.log('No data in AsyncStorage key', paydayStoredAmount);
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage', error);
    }
  };

  storePaydaySettingsTime = async (time, date) => {
    console.log('storePaydaySettingsTime go now!', time, date);
    AsyncStorage.setItem('@Jars_paydayTime', time);
    AsyncStorage.setItem('@Jars_paydayDate', date);
  };

  loadPaydaySettingsTime = async () => {
    // console.log('loadPaydaySettingsTime go now!');
    try {
      const paydayStoredTime = await AsyncStorage.getItem('@Jars_paydayTime');
      const paydayStoredDate = await AsyncStorage.getItem('@Jars_paydayDate');
      if (paydayStoredTime !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_paydayTime',
          paydayStoredTime,
          paydayStoredDate,
        );
        this.setState({
          paydayTime: paydayStoredTime,
        });
        if (paydayStoredDate === null) {
          // console.log(
          //   'loadPaydaySettingsTime date = null, so date = ',
          //   new Date(),
          // );
          this.setState({payDayPickerTime: new Date()});
        } else {
          const parsedDate = paydayStoredDate.replace(/"/g, '');
          console.log('stored payday parsedDate = ', parsedDate);

          const date = new Date(parsedDate);
          // console.log('stored payday date = ', date);
          // console.log('stored payday date = ', typeof date);
          // console.log(
          //   'loadPaydaySettingsTime string date converted to date object = ',
          //   new Date(date),
          // );
          this.setState({payDayPickerTime: date});
        }
      } else {
        console.log('No data in AsyncStorage key', paydayStoredTime);
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage', error);
    }
  };

  storePaydaySettingsDay = async (day) => {
    // console.log('storePaydaySettingsDay go now!', day);
    AsyncStorage.setItem('@Jars_paydayDay', day);
  };

  loadPaydaySettingsDay = async () => {
    // console.log('loadPaydaySettingsDay go now!');
    try {
      const paydayStoredDay = await AsyncStorage.getItem('@Jars_paydayDay');
      if (paydayStoredDay !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_paydayDay',
          paydayStoredDay,
        );
        this.setState({
          isSelectedPayday: paydayStoredDay,
        });
      } else {
        console.log(
          'No data in AsyncStorage @Jars_paydayDay key',
          paydayStoredDay,
        );
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage @Jars_paydayDay key', error);
    }
  };

  storeJarPercent = async () => {
    const {spendJarPercent, saveJarPercent, shareJarPercent} = this.state;

    const spend = spendJarPercent.toString();
    const save = saveJarPercent.toString();
    const share = shareJarPercent.toString();
    console.log('storeJarPercent go now!', spend, save, share);

    AsyncStorage.setItem('@Jars_spendJarPercent', spend);
    AsyncStorage.setItem('@Jars_saveJarPercent', save);
    AsyncStorage.setItem('@Jars_shareJarPercent', share);
  };

  loadJarPercent = async () => {
    // console.log('readJarValue go now!');
    try {
      const spendPercent = await AsyncStorage.getItem('@Jars_spendJarPercent');
      const savePercent = await AsyncStorage.getItem('@Jars_saveJarPercent');
      const sharePercent = await AsyncStorage.getItem('@Jars_shareJarPercent');

      if (spendPercent !== null) {
        const spendVal = parseFloat(spendPercent);
        const saveVal = parseFloat(savePercent);
        const shareVal = parseFloat(sharePercent);
        console.log(
          'Fetched data from AsyncStorage',
          spendVal,
          saveVal,
          shareVal,
        );
        this.setState({
          spendJarPercent: spendVal,
          saveJarPercent: saveVal,
          shareJarPercent: shareVal,
        });
      } else {
        console.log(
          'No data in AsyncStorage @Jars_spendJarPercent key',
          spendPercent,
          savePercent,
          sharePercent,
        );
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage @Jars_spendJarPercent', error);
    }
  };

  storeChildsInitials = async (str) => {
    console.log('storeChildsInitials go now!', str);
    AsyncStorage.setItem('@Jars_childInitials', str);
  };

  loadChildsInitials = async () => {
    console.log('loadChildsInitials go now!');
    try {
      const childInitialsStoredAmount = await AsyncStorage.getItem(
        '@Jars_childInitials',
      );
      if (childInitialsStoredAmount !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_childInitials',
          childInitialsStoredAmount,
        );
        this.setState({
          childsInitials: childInitialsStoredAmount,
        });
      } else {
        console.log(
          'No data in AsyncStorage @Jars_childInitials',
          childInitialsStoredAmount,
        );
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage @Jars_childInitials', error);
    }
  };

  storePaydaySMSNumber = async (number) => {
    console.log('storePaydaySMSNumber go now!', number);
    AsyncStorage.setItem('@Jars_parentPhone', number);
  };

  loadPaydaySMSNumber = async () => {
    console.log('loadPaydaySMSNumber go now!');
    try {
      const parentPhoneStoredAmount = await AsyncStorage.getItem(
        '@Jars_parentPhone',
      );
      if (parentPhoneStoredAmount !== null) {
        console.log(
          'Fetched data from AsyncStorage @Jars_parentPhone',
          parentPhoneStoredAmount,
        );
        this.setState({
          paydaySMSNumber: parentPhoneStoredAmount,
        });
      } else {
        console.log(
          'No data in AsyncStorage @Jars_parentPhone',
          parentPhoneStoredAmount,
        );
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage @Jars_parentPhone', error);
    }
  };

  setJarPercent = (value, jar) => {
    // console.log('Value passed from setJarPercent = ', value);
    // console.log('jar passed from setJarPercent = ', jar);

    let val = Math.round(value);
    let jarName = jar['current'];

    this.setState({
      showJarPercentError: false,
      showJarPercentCheck: true,
      showJarPercentSuccess: false,
    });

    switch (jarName) {
      case 'spendJar':
        this.setState({
          spendJarPercent: val,
          // saveJarPercent: (100 - val) / 2,
          // shareJarPercent: (100 - val) / 2,
        });
        break;
      case 'saveJar':
        this.setState({
          saveJarPercent: val,
        });
        break;
      case 'shareJar':
        this.setState({
          shareJarPercent: val,
        });
        break;
      default:
        Alert.alert('Uh oh. App says it broke.');
    }
  };

  verifyJarPercentages = () => {
    const {
      spendJarPercent,
      saveJarPercent,
      shareJarPercent,
      maxSpendJarPercent,
      maxSaveJarPercent,
      maxShareJarPercent,
    } = this.state;
    let total = spendJarPercent + saveJarPercent + shareJarPercent;
    // console.log(`
    //   Jar percentages are trying to be set, so let's math!
    //   ----------------------------------------------------
    //   Spend Jar percent = ${spendJarPercent}
    //   Save Jar percent = ${saveJarPercent}
    //   Share Jar percent = ${shareJarPercent}
    //   ----------------------------------------------------
    //               Total = ${total}
    // `);
    if (total !== 100) {
      this.setState({
        showJarPercentError: true,
        showJarPercentSuccess: false,
        showJarPercentCheck: false,
        spendJarPercent: 50,
        saveJarPercent: 40,
        shareJarPercent: 10,
      });
    } else {
      this.setState({
        showJarPercentError: false,
        showJarPercentSuccess: true,
        showJarPercentCheck: false,
      });
      this.storeJarPercent();
    }
  };

  setPaydayIsEnabled = () => {
    // console.log('setPaydayIsEnabled hook go now!');
    const {paydayIsEnabled} = this.state;
    this.storePaydaySettingsIsEnabled(!paydayIsEnabled);
    // console.log('payDayIsEnabled from state = ', !paydayIsEnabled);
    this.setState({
      paydayIsEnabled: !paydayIsEnabled,
    });
  };

  setPaydayAmount = (text) => {
    // console.log('setPaydayAmount func go now!', text);
    this.storePaydaySettingsAmount(text);
    this.setState({paydayAmount: text});
  };

  setPaydayOfTheWeek = (day) => {
    // console.log('setPaydayOfTheWeek go now!', day);
    this.setState({isSelectedPayday: day});
    switch (day) {
      case 'Sunday':
        this.setState({
          isSelectedPaydaySunday: true,
          isSelectedPaydayMonday: false,
          isSelectedPaydayTuesday: false,
          isSelectedPaydayWednesday: false,
          isSelectedPaydayThursday: false,
          isSelectedPaydayFriday: false,
          isSelectedPaydaySaturday: false,
        });
        break;
      case 'Monday':
        this.setState({
          isSelectedPaydaySunday: false,
          isSelectedPaydayMonday: true,
          isSelectedPaydayTuesday: false,
          isSelectedPaydayWednesday: false,
          isSelectedPaydayThursday: false,
          isSelectedPaydayFriday: false,
          isSelectedPaydaySaturday: false,
        });
        break;
      case 'Tuesday':
        this.setState({
          isSelectedPaydaySunday: false,
          isSelectedPaydayMonday: false,
          isSelectedPaydayTuesday: true,
          isSelectedPaydayWednesday: false,
          isSelectedPaydayThursday: false,
          isSelectedPaydayFriday: false,
          isSelectedPaydaySaturday: false,
        });
        break;
      case 'Wednesday':
        this.setState({
          isSelectedPaydaySunday: false,
          isSelectedPaydayMonday: false,
          isSelectedPaydayTuesday: false,
          isSelectedPaydayWednesday: true,
          isSelectedPaydayThursday: false,
          isSelectedPaydayFriday: false,
          isSelectedPaydaySaturday: false,
        });
        break;
      case 'Thursday':
        this.setState({
          isSelectedPaydaySunday: false,
          isSelectedPaydayMonday: false,
          isSelectedPaydayTuesday: false,
          isSelectedPaydayWednesday: false,
          isSelectedPaydayThursday: true,
          isSelectedPaydayFriday: false,
          isSelectedPaydaySaturday: false,
        });
        break;
      case 'Friday':
        this.setState({
          isSelectedPaydaySunday: false,
          isSelectedPaydayMonday: false,
          isSelectedPaydayTuesday: false,
          isSelectedPaydayWednesday: false,
          isSelectedPaydayThursday: false,
          isSelectedPaydayFriday: true,
          isSelectedPaydaySaturday: false,
        });
        break;
      case 'Saturday':
        this.setState({
          isSelectedPaydaySunday: false,
          isSelectedPaydayMonday: false,
          isSelectedPaydayTuesday: false,
          isSelectedPaydayWednesday: false,
          isSelectedPaydayThursday: false,
          isSelectedPaydayFriday: false,
          isSelectedPaydaySaturday: true,
        });
        break;
    }
    this.storePaydaySettingsDay(day);
  };

  onFilterLogData = (text) => {
    // console.log('Filter log history search term = ', text);
    this.setState({logDataFilter: text});
    const newData = this.state.filteredLogData.filter((log) => {
      const logItem = `${log.jar.toUpperCase()} ${
        log.date
      } ${log.details.toUpperCase()} ${log.amount} ${log.total}`;
      const searchTerm = text.toUpperCase();
      return logItem.indexOf(searchTerm) > -1;
    });
    // console.log('Filter log history newData array = ', newData);

    if (text.length > 0) {
      this.setState({logData: newData});
    } else {
      this.setState({logData: this.state.filteredLogData});
    }
  };

  setPaydayTime = (event, selectedDate) => {
    // console.log('time picker returns, ', selectedDate);
    let selectedTime = selectedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    // console.log('time picker returns, ', selectedTime);
    this.setState({paydayTime: selectedTime, payDayPickerTime: selectedDate});

    const paydayDateStringify = JSON.stringify(selectedDate);
    // console.log('setPayTime date sent to AsyncStorage = ', paydayDateStringify);
    this.storePaydaySettingsTime(selectedTime, paydayDateStringify);
  };

  setActiveJar = (props, jar, math) => {
    // console.log('setActiveJar args = ', props, jar, math);

    this.setState({activeJar: jar});

    const path = math === 'minus' ? 'JarMinus' : 'JarAdd';
    props.navigation.navigate(path);
  };

  setJarNote = (note) => {
    // console.log('setJarNote go now');
    const {activeJar} = this.state;

    switch (activeJar) {
      case 'spend':
        this.setState({spendJarNote: note});
        break;
      case 'save':
        this.setState({saveJarNote: note});
        break;
      case 'share':
        this.setState({shareJarNote: note});
        break;
    }
  };

  setIncomingJarValue = (amount, jar, math) => {
    const {spendJarValue, saveJarValue, shareJarValue, activeJar} = this.state;

    // Limit decimals to 2
    let limitedDecimals = amount;
    amount =
      limitedDecimals.indexOf('.') >= 0
        ? limitedDecimals.substr(0, limitedDecimals.indexOf('.')) +
          limitedDecimals.substr(limitedDecimals.indexOf('.'), 3)
        : limitedDecimals;

    console.log('limit decimals to 2, incoming value = ', amount);

    let incomingValue =
      math === 'minus' ? parseFloat(amount) * -1 : parseFloat(amount);

    console.log('incomingValue = ', incomingValue);

    // let incomingValueRoundedStr = Number(
    //   (Math.floor(incomingValue * 100) / 100).toFixed(2),
    // );

    // console.log(
    //   'incomingValueRoundedStr = ',
    //   incomingValueRoundedStr,
    //   jar,
    //   math,
    //   'spendJarValue = ',
    //   spendJarValue,
    // );

    switch (activeJar) {
      case 'spend':
        let newSpendTotal =
          spendJarValue +
          Number((Math.floor(incomingValue * 100) / 100).toFixed(2));

        console.log('newSpendTotal = ', newSpendTotal);

        let newSpendTotalRounded = Number(
          (Math.floor(newSpendTotal * 100) / 100).toFixed(2),
        );

        console.log('newSpendTotalRounded = ', newSpendTotalRounded);
        console.log('spendJarOldValue about = ', spendJarValue);

        this.setState({
          spendJarOldValue: spendJarValue,
          spendJarNewValue: newSpendTotalRounded,
          isDisabledMinusButton: false,
          isDisabledAddButton: false,
          spendJarIncomingValue: incomingValue,
        });
        break;
      case 'save':
        let newSaveTotal =
          saveJarValue +
          Number((Math.floor(incomingValue * 100) / 100).toFixed(2));

        console.log('newSaveTotal = ', newSaveTotal);

        let newSaveTotalRounded = Number(
          (Math.floor(newSaveTotal * 100) / 100).toFixed(2),
        );

        console.log('newSpendTotalRounded = ', newSaveTotalRounded);
        console.log('spendJarOldValue about = ', spendJarValue);

        this.setState({
          saveJarOldValue: saveJarValue,
          saveJarNewValue: newSaveTotalRounded,
          isDisabledMinusButton: false,
          isDisabledAddButton: false,
          saveJarIncomingValue: incomingValue,
        });
        break;
      case 'share':
        const newShareTotal =
          shareJarValue +
          Number((Math.floor(incomingValue * 100) / 100).toFixed(2));

        console.log('newShareTotal = ', newShareTotal);

        let newShareTotalRounded = Number(
          (Math.floor(newShareTotal * 100) / 100).toFixed(2),
        );

        console.log('newSpendTotalRounded = ', newShareTotalRounded);
        console.log('spendJarOldValue about = ', spendJarValue);

        this.setState({
          shareJarOldValue: saveJarValue,
          shareJarNewValue: newShareTotalRounded,
          isDisabledMinusButton: false,
          isDisabledAddButton: false,
          shareJarIncomingValue: incomingValue,
        });
        break;
    }
  };

  setJarValue = (props, jar) => {
    const {
      activeJar,
      spendJarIncomingValue,
      spendJarNewValue,
      spendJarNote,
      saveJarIncomingValue,
      saveJarNewValue,
      saveJarNote,
      shareJarIncomingValue,
      shareJarNewValue,
      shareJarNote,
      logData,
    } = this.state;
    // console.log('setJarValue amount = ', props, jar);
    // console.log('setJarValue state at beginning of function', this.state);

    const getDate = () => {
      const date = new Date().toDateString();
      return date;
    };

    let log = {};
    let logCopy = [];

    switch (activeJar) {
      case 'spend':
        log = {
          id: logData.length + 1,
          jar: jar,
          date: getDate(),
          details: spendJarNote,
          amount: spendJarIncomingValue,
          total: spendJarNewValue,
        };

        // console.log('log = ', log);
        logCopy = [log, ...logData];
        // console.log('logCopy = ', logCopy);

        this.setState({
          spendJarNote: '',
          spendJarValue: spendJarNewValue,
          spendJarOldValue: spendJarNewValue,
          spendJarNewValue: 0,
          isDisabledMinusButton: true,
          isDisabledAddButton: true,
          logData: logCopy,
          filteredLogData: logCopy,
        });
        this.storeJarValue(activeJar, spendJarNewValue, logCopy);
        break;
      case 'save':
        log = {
          id: logData.length + 1,
          jar: jar,
          date: getDate(),
          details: saveJarNote,
          amount: saveJarIncomingValue,
          total: saveJarNewValue,
        };

        // console.log('log = ', log);
        logCopy = [log, ...logData];
        // console.log('logCopy = ', logCopy);

        this.setState({
          saveJarNote: '',
          saveJarValue: saveJarNewValue,
          saveJarOldValue: saveJarNewValue,
          saveJarNewValue: 0,
          isDisabledMinusButton: true,
          isDisabledAddButton: true,
          logData: logCopy,
          filteredLogData: logCopy,
        });
        this.storeJarValue(activeJar, saveJarNewValue, logCopy);
        break;
      case 'share':
        log = {
          id: logData.length + 1,
          jar: jar,
          date: getDate(),
          details: shareJarNote,
          amount: shareJarIncomingValue,
          total: shareJarNewValue,
        };

        // console.log('log = ', log);
        logCopy = [log, ...logData];
        // console.log('logCopy = ', logCopy);

        this.setState({
          shareJarNote: '',
          shareJarValue: shareJarNewValue,
          shareJarOldValue: shareJarNewValue,
          shareJarNewValue: 0,
          isDisabledMinusButton: true,
          isDisabledAddButton: true,
          logData: logCopy,
          filteredLogData: logCopy,
        });
        this.storeJarValue(activeJar, shareJarNewValue, logCopy);
        break;
    }

    // console.log('setJarValue finished, state updated to ', this.state);
    props.navigation.navigate('Jars');
  };

  cancelChangeJarValue = (props) => {
    console.log('cancelChangeJarValue go now!', props);
    const {activeJar} = this.state;

    switch (activeJar) {
      case 'spend':
        this.setState({
          spendJarNewValue: 0,
          isDisabledMinusButton: true,
          isDisabledAddButton: true,
          spendJarNote: '',
        });
        break;
      case 'save':
        this.setState({
          saveJarNewValue: 0,
          isDisabledMinusButton: true,
          isDisabledAddButton: true,
          saveJarNote: '',
        });
        break;
      case 'share':
        this.setState({
          shareJarNewValue: 0,
          isDisabledMinusButton: true,
          isDisabledAddButton: true,
          shareJarNote: '',
        });
        break;
    }
    props.navigation.goBack();
  };

  setPaydayManually = (props) => {
    const {
      spendJarValue,
      saveJarValue,
      shareJarValue,
      logData,
      paydayAmount,
      spendJarPercent,
      saveJarPercent,
      shareJarPercent,
      paydaySMSNumber,
      childsInitials,
    } = this.state;

    const getDate = () => {
      const date = new Date().toDateString();
      return date;
    };

    console.log(
      `
        setPaydayManually values to update:
        --------------------------------------
        Spend jar new total: ${spendJarValue} + ${
        paydayAmount * (spendJarPercent / 100).toFixed(2)
      }
        Save jar new total: ${saveJarValue} + ${
        paydayAmount * (saveJarPercent / 100).toFixed(2)
      }
        Share jar new total: ${shareJarValue} + ${
        paydayAmount * (shareJarPercent / 100).toFixed(2)
      }
        Log spend jar = {
          id: ${logData.length + 1},
          jar: 'spend',
          date: ${getDate()},
          details: 'Weekly chores',
          amount: ${paydayAmount * (spendJarPercent / 100)},
          new total: ${spendJarValue} + ${
        paydayAmount * (spendJarPercent / 100)
      },
        };
        Log save jar = {
          id: ${logData.length + 2},
          jar: 'save',
          date: ${getDate()},
          details: 'Weekly chores',
          amount: ${paydayAmount * (saveJarPercent / 100)},
          new total: ${saveJarValue} + ${paydayAmount * (saveJarPercent / 100)},
        };
        Log share jar = {
          id: ${logData.length + 3},
          jar: 'share',
          date: ${getDate()},
          details: 'Weekly chores',
          amount: ${paydayAmount * (shareJarPercent / 100)},
          new total: ${shareJarValue} + ${
        paydayAmount * (shareJarPercent / 100)
      },
        };
      `,
    );

    // Update spend, save, and share jar values
    let spendJarNewTotal = (
      spendJarValue +
      paydayAmount * (spendJarPercent / 100)
    ).toFixed(2);

    let saveJarNewTotal = (
      saveJarValue +
      paydayAmount * (saveJarPercent / 100)
    ).toFixed(2);

    let shareJarNewTotal = (
      shareJarValue +
      paydayAmount * (shareJarPercent / 100)
    ).toFixed(2);

    let logCopy = [];

    let spendlog = {
      id: logData.length + 1,
      jar: 'spend',
      date: getDate(),
      details: 'Weekly chores',
      amount: (paydayAmount * (spendJarPercent / 100)).toFixed(2),
      total: spendJarNewTotal,
    };
    logCopy = [spendlog, ...logData];
    this.storeJarValue('spend', spendJarNewTotal, logCopy);

    let savelog = {
      id: logData.length + 2,
      jar: 'save',
      date: getDate(),
      details: 'Weekly chores',
      amount: (paydayAmount * (saveJarPercent / 100)).toFixed(2),
      total: saveJarNewTotal,
    };
    logCopy = [savelog, ...logCopy];
    this.storeJarValue('save', saveJarNewTotal, logCopy);

    let sharelog = {
      id: logData.length + 3,
      jar: 'share',
      date: getDate(),
      details: 'Weekly chores',
      amount: (paydayAmount * (shareJarPercent / 100)).toFixed(2),
      total: shareJarNewTotal,
    };
    logCopy = [sharelog, ...logCopy];
    this.storeJarValue('share', shareJarNewTotal, logCopy);

    this.setState({
      spendJarValue: spendJarNewTotal,
      saveJarValue: saveJarNewTotal,
      shareJarValue: shareJarNewTotal,
      logData: logCopy,
      filteredLogData: logCopy,
    });

    // console.log('setPaydayManually props = ', props);
    // console.log('Post manual payday call state = ', this.state);

    // Send an SMS
    // Check for stored phone number
    if (paydaySMSNumber.length > 0) {
      SendSMS.send(
        {
          // Message body
          body: `Bankbuddy has paid ${
            childsInitials !== '' ? childsInitials : 'your child'
          } their allowance manually.`,
          // Recipients Number
          recipients: [paydaySMSNumber],
          allowAndroidSendWithoutReadPermission: true,
          // An array of types
          // "completed" response when using android
          successTypes: ['sent', 'queued'],
        },
        (completed, cancelled, error) => {
          if (completed) {
            console.log('SMS Sent Completed');
            props.navigation.navigate('Jars');
            this.setShowPaydayManuallyModal();
          } else if (cancelled) {
            console.log('SMS Sent Cancelled');
            props.navigation.navigate('Jars');
            this.setShowPaydayManuallyModal();
          } else if (error) {
            console.log('Some error occured with SendSMS');
            props.navigation.navigate('Jars');
            this.setShowPaydayManuallyModal();
          }
        },
      );
    } else {
      props.navigation.navigate('Jars');
      this.setShowPaydayManuallyModal();
    }
  };

  setChildInitials = (text) => {
    // console.log('setChildInitials text from input = ', text);
    var str = text.toLowerCase();
    this.setState({childsInitials: str});
    this.storeChildsInitials(str);
  };

  setPaydaySMSNumber = (text) => {
    console.log('setPaydaySMSNumber text from input = ', text);
    this.setState({paydaySMSNumber: text});
    this.storePaydaySMSNumber(text);
  };

  setShowPaydayManuallyModal = () => {
    const {showPaydayManuallyModal} = this.state;
    this.setState({showPaydayManuallyModal: !showPaydayManuallyModal});
  };

  render() {
    // console.log('App props, ', this.props);
    // console.log('isPaid = ', this.state.isPaid);

    const {
      activeJar,
      spendJarPercent,
      saveJarPercent,
      shareJarPercent,
      maxSpendJarPercent,
      maxSaveJarPercent,
      maxShareJarPercent,
      showJarPercentError,
      showJarPercentCheck,
      showJarPercentSuccess,
      showPaydayManuallyModal,
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
      spendJarValue,
      spendJarNote,
      spendJarOldValue,
      spendJarNewValue,
      saveJarValue,
      saveJarNote,
      saveJarOldValue,
      saveJarNewValue,
      shareJarValue,
      shareJarNote,
      shareJarOldValue,
      shareJarNewValue,
      isDisabledMinusButton,
      isDisabledAddButton,
      isDisabledPaydayManually,
      childsInitials,
      paydaySMSNumber,
    } = this.state;
    return (
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            options={{headerMode: 'none', headerShown: false}}>
            {(props) => (
              <MainStackScreen
                {...props}
                isDisabledMinusButton={isDisabledMinusButton}
                isDisabledAddButton={isDisabledAddButton}
                handlePaydayOfTheWeek={this.setPaydayOfTheWeek}
                handlePaydayTime={this.setPaydayTime}
                handleLogDataFilter={this.onFilterLogData}
                handlePaydayIsEnabled={this.setPaydayIsEnabled}
                handleJarPercentage={this.setJarPercent}
                handleVerifyJarPercentage={this.verifyJarPercentages}
                handleLogDataFilter={this.onFilterLogData}
                handlePaydayIsEnabled={this.setPaydayIsEnabled}
                handlePaydayAmount={this.setPaydayAmount}
                handleActiveJar={this.setActiveJar}
                handlePayManually={this.setPaydayManually}
                handleSettingChildInitials={this.setChildInitials}
                handleShowPaydayManuallyModal={this.setShowPaydayManuallyModal}
                handlePaydaySMSNumber={this.setPaydaySMSNumber}
                spendJarPercent={spendJarPercent}
                saveJarPercent={saveJarPercent}
                shareJarPercent={shareJarPercent}
                paydayIsEnabled={paydayIsEnabled}
                logData={logData}
                logDataFilter={logDataFilter}
                isSelectedPayday={isSelectedPayday}
                paydayTime={paydayTime}
                payDayPickerTime={payDayPickerTime}
                maxSpendJarPercent={maxSpendJarPercent}
                maxSaveJarPercent={maxSaveJarPercent}
                maxShareJarPercent={maxShareJarPercent}
                showJarPercentError={showJarPercentError}
                showJarPercentSuccess={showJarPercentSuccess}
                showJarPercentCheck={showJarPercentCheck}
                showPaydayManuallyModal={showPaydayManuallyModal}
                isSelectedPaydaySunday={isSelectedPaydaySunday}
                isSelectedPaydayMonday={isSelectedPaydayMonday}
                isSelectedPaydayTuesday={isSelectedPaydayTuesday}
                isSelectedPaydayWednesday={isSelectedPaydayWednesday}
                isSelectedPaydayThursday={isSelectedPaydayThursday}
                isSelectedPaydayFriday={isSelectedPaydayFriday}
                isSelectedPaydaySaturday={isSelectedPaydaySaturday}
                paydayAmount={paydayAmount}
                isDisabledPaydayManually={isDisabledPaydayManually}
                spendJarValue={spendJarValue}
                saveJarValue={saveJarValue}
                shareJarValue={shareJarValue}
                childsInitials={childsInitials}
                paydaySMSNumber={paydaySMSNumber}
              />
            )}
          </RootStack.Screen>
          <RootStack.Screen
            name="JarAdd"
            // component={JarAdd}
            options={{headerMode: 'none', headerShown: false}}>
            {(props) => (
              <JarAdd
                {...props}
                activeJar={activeJar}
                spendJarValue={spendJarValue}
                spendJarNote={spendJarNote}
                spendJarOldValue={spendJarOldValue}
                spendJarNewValue={spendJarNewValue}
                saveJarValue={saveJarValue}
                saveJarNote={saveJarNote}
                saveJarOldValue={saveJarOldValue}
                saveJarNewValue={saveJarNewValue}
                shareJarValue={shareJarValue}
                shareJarNote={shareJarNote}
                shareJarOldValue={shareJarOldValue}
                shareJarNewValue={shareJarNewValue}
                isDisabledAddButton={isDisabledAddButton}
                handleJarNote={this.setJarNote}
                handleJarValue={this.setJarValue}
                handleIncomingJarValue={this.setIncomingJarValue}
                handleCancelJarValue={this.cancelChangeJarValue}
              />
            )}
          </RootStack.Screen>
          <RootStack.Screen
            name="JarMinus"
            // component={JarMinus}
            options={{headerMode: 'none', headerShown: false}}>
            {(props) => (
              <JarMinus
                {...props}
                activeJar={activeJar}
                spendJarValue={spendJarValue}
                spendJarNote={spendJarNote}
                spendJarOldValue={spendJarOldValue}
                spendJarNewValue={spendJarNewValue}
                saveJarValue={saveJarValue}
                saveJarNote={saveJarNote}
                saveJarOldValue={saveJarOldValue}
                saveJarNewValue={saveJarNewValue}
                shareJarValue={shareJarValue}
                shareJarNote={shareJarNote}
                shareJarOldValue={shareJarOldValue}
                shareJarNewValue={shareJarNewValue}
                isDisabledMinusButton={isDisabledMinusButton}
                handleJarNote={this.setJarNote}
                handleJarValue={this.setJarValue}
                handleIncomingJarValue={this.setIncomingJarValue}
                handleCancelJarValue={this.cancelChangeJarValue}
              />
            )}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
