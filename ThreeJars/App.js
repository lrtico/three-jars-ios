import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import JarsScreen from './components/JarsScreen/JarsScreen';
import SettingsScreen from './components/Settings/SettingsScreen';
import PaydaySettings from './components/Settings/PaydaySettings';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    console.log('App props, ', this.props);
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Jars">
          <Stack.Screen
            name="Jars"
            component={JarsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
          <Stack.Screen
            name="Payday"
            component={PaydaySettings}
            options={{title: 'Payday'}}
          />
        </Stack.Navigator>
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
