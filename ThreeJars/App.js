import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert} from 'react-native';
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
    paydayIsEnabled: true,
    paydayAmount: '',
    isSelectedPayday: 'Saturday',
    isSelectedPaydaySunday: false,
    isSelectedPaydayMonday: false,
    isSelectedPaydayTuesday: false,
    isSelectedPaydayWednesday: false,
    isSelectedPaydayThursday: false,
    isSelectedPaydayFriday: false,
    isSelectedPaydaySaturday: true,
    paydayTime: '12:00 PM',
    payDayPickerTime: '2020-09-23T18:00:00.000Z',
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
    this.readJarValue();
  }

  // saveJarValue = async (value) => {
  //   console.log('AsyncStorage save go now!', value);
  //   try {
  //     await AsyncStorage.setItem('@JarsStore_spendJarValue', value);
  //     console.log('AsyncStorage go now,');
  //   } catch (error) {
  //     console.error('Error saving data to AsyncStorage', error);
  //   }
  // };

  readJarValue = async () => {
    console.log('readJarValue go now!');
    // try {
    //   const value = await AsyncStorage.getItem('@JarsStore_spendJarValue');
    //   if (value !== null) {
    //     console.log('Fetched data from AsyncStorage', value);
    //   } else {
    //     console.log('No data in AsyncStorage key', value);
    //   }
    // } catch (error) {
    //   console.error('Error fetching AsyncStorage', error);
    // }
  };

  setJarPercent = (value, jar) => {
    // console.log('Value passed from setJarPercent = ', value);
    // console.log('jar passed from setJarPercent = ', jar);
    let val = Math.round(value);
    let jarName = jar['current'];
    // console.log('jarName = ', jarName);

    const {
      spendJarPercent,
      saveJarPercent,
      shareJarPercent,
      maxSpendJarPercent,
      maxSaveJarPercent,
      maxShareJarPercent,
    } = this.state;

    this.setState({
      showJarPercentError: false,
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
        spendJarPercent: 50,
        saveJarPercent: 40,
        shareJarPercent: 10,
      });
    } else {
      this.setState({
        showJarPercentError: false,
      });
    }
  };

  setPaydayIsEnabled = () => {
    // console.log('setPaydayIsEnabled hook go now!');
    this.setState({
      paydayIsEnabled: !this.state.paydayIsEnabled,
    });
  };

  setPaydayAmount = (text) => {
    // console.log('setPaydayAmount func go now!', text);
    this.setState({paydayAmount: text});
  };

  setPaydayOfTheWeek = (day) => {
    console.log('setPaydayOfTheWeek go now!', day);
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

        // this.saveJarValue(spendJarValue);

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
    const {
      activeJar,
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
                handleJarPercentage={this.setJarPercent}
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
