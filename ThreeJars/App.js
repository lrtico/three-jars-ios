import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import JarAdd from './components/JarsScreen/JarAdd';
import JarMinus from './components/JarsScreen/JarMinus';
import MainStackScreen from './components/Navigation/MainStackScreen';

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
  };

  componentDidMount() {
    // console.log('componentDidMount go now');
    // AsyncStorage.setItem('@Jars_spendJarValue', '3');
    this.loadJarValue();
    this.loadPaydaySettingsIsEnabled();
    this.loadPaydaySettingsAmount();
  }

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
        const saveVal = parseFloat(saveValue);
        const shareVal = parseFloat(shareValue);
        const logParsed = JSON.parse(logs);
        // console.log('Fetched data from AsyncStorage', spendValue, logParsed);
        this.setState({
          spendJarValue: spendVal,
          saveJarValue: saveVal,
          shareJarValue: shareVal,
          logData: logParsed,
          filteredLogData: logParsed,
        });
      } else {
        console.log(
          'No data in AsyncStorage key',
          spendValue,
          saveValue,
          shareValue,
          logs,
        );
      }
    } catch (error) {
      console.error('Error fetching AsyncStorage', error);
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

  setJarPercent = (value, jar) => {
    // console.log('Value passed from setJarPercent = ', value);
    // console.log('jar passed from setJarPercent = ', jar);
    const {
      spendJarPercent,
      saveJarPercent,
      shareJarPercent,
      maxSpendJarPercent,
      maxSaveJarPercent,
      maxShareJarPercent,
    } = this.state;

    let val = Math.round(value);
    let jarName = jar['current'];
    let total = spendJarPercent + saveJarPercent + shareJarPercent;
    // console.log('jarName = ', jarName);

    // if (total !== 100) {
    //   this.setState({
    //     // showJarPercentSuccess: false,
    //     showJarPercentCheck: true,
    //   });
    // } else {
    //   this.setState({
    //     // showJarPercentSuccess: true,
    //     showJarPercentCheck: false,
    //   });
    // }

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
    console.log('time picker returns, ', selectedDate);
    let selectedTime = selectedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log('time picker returns, ', selectedTime);
    this.setState({paydayTime: selectedTime, payDayPickerTime: selectedDate});
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

    const incomingValue =
      math === 'minus' ? parseFloat(amount) * -1 : parseFloat(amount);

    // console.log('incomingValue = ', incomingValue, jar, math);

    switch (activeJar) {
      case 'spend':
        const newSpendTotal = parseFloat(spendJarValue + incomingValue);

        this.setState({
          spendJarOldValue: spendJarValue,
          spendJarNewValue: newSpendTotal,
          isDisabledMinusButton: false,
          isDisabledAddButton: false,
          spendJarIncomingValue: incomingValue,
        });
        break;
      case 'save':
        const newSaveTotal = parseFloat(saveJarValue + incomingValue);

        this.setState({
          saveJarOldValue: saveJarValue,
          saveJarNewValue: newSaveTotal,
          isDisabledMinusButton: false,
          isDisabledAddButton: false,
          saveJarIncomingValue: incomingValue,
        });
        break;
      case 'share':
        const newShareTotal = parseFloat(shareJarValue + incomingValue);

        this.setState({
          shareJarOldValue: saveJarValue,
          shareJarNewValue: newShareTotal,
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
      spendJarValue,
      spendJarIncomingValue,
      spendJarNewValue,
      spendJarNote,
      saveJarValue,
      saveJarIncomingValue,
      saveJarNewValue,
      saveJarNote,
      shareJarValue,
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
        logCopy = [...logData, log];
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
        logCopy = [...logData, log];
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
        logCopy = [...logData, log];
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
    // console.log('cancelChangeJarValue go now!', props);
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

  render() {
    // console.log('App props, ', this.props);
    // console.log('payDayPickerTime = ', this.state.payDayPickerTime);
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
                isSelectedPaydaySunday={isSelectedPaydaySunday}
                isSelectedPaydayMonday={isSelectedPaydayMonday}
                isSelectedPaydayTuesday={isSelectedPaydayTuesday}
                isSelectedPaydayWednesday={isSelectedPaydayWednesday}
                isSelectedPaydayThursday={isSelectedPaydayThursday}
                isSelectedPaydayFriday={isSelectedPaydayFriday}
                isSelectedPaydaySaturday={isSelectedPaydaySaturday}
                paydayAmount={paydayAmount}
                spendJarValue={spendJarValue}
                saveJarValue={saveJarValue}
                shareJarValue={shareJarValue}
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
