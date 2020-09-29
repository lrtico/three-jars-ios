import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert} from 'react-native';
import JarsScreen from './components/JarsScreen/JarsScreen';
import SettingsScreen from './components/Settings/SettingsScreen';
import PaydaySettings from './components/Settings/PaydaySettings';
import PaydayDateTimeSettings from './components/Settings/PaydayDateTimeSettings';
import LogHistory from './components/Settings/LogHistory';
import JarPercentages from './components/Settings/JarPercentages';
import JarAdd from './components/JarsScreen/JarAdd';
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
  };

  componentDidMount() {
    const data = [
      {
        id: '1',
        jar: 'Spend jar',
        date: 'Mon Sep 07 2020',
        details: 'Mopping the floors',
        amount: '+3.5',
        total: '5.00',
      },
      {
        id: '2',
        jar: 'Spend jar',
        date: 'Sat Sep 12 2020',
        details: 'Weekly chores',
        amount: '+7',
        total: '12.00',
      },
      {
        id: '3',
        jar: 'Save jar',
        date: 'Sat Sep 12 2020',
        details: 'Weekly chores',
        amount: '+1',
        total: '3.00',
      },
    ];
    this.setState({logData: data, filteredLogData: data});
  }

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
      const logItem = `${log.jar} ${log.date} ${log.details} ${log.amount} ${log.total}`;
      const searchTerm = text;
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

  render() {
    // console.log('App props, ', this.props);
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
              />
            )}
          </RootStack.Screen>
          <RootStack.Screen
            name="JarAdd"
            component={JarAdd}
            options={{headerMode: 'none', headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Jars"
//           component={JarsScreen}
//           options={{title: 'Welcome'}}
//         />
//         <Stack.Screen name="Settings" component={SettingsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default App;
