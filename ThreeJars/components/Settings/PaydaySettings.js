import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const PaydaySettings = (props) => {
  console.log('WeeklyAllowanceSettings props = ', props);
  const {navigation} = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const [value, onChangeText] = React.useState('$');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEEKLY ALLOWANCE SETTINGS</Text>
      <View style={styles.section}>
        <View style={[styles.row, styles.rowBorderBottom]}>
          <Text style={styles.row__title}>Payday</Text>
          <Switch
            trackColor={{false: '#767577', true: '#34C759'}}
            thumbColor={isEnabled ? 'white' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.row__title}>Amount</Text>
          <Text style={styles.row__value}>$</Text>
          <TextInput
            style={styles.textinput}
            // onChangeText={(text) => onChangeText(text)}
            // value={value}
            placeholder={'Enter amount'}
            clearButtonMode={'while-editing'}
            keyboardType={'numeric'}
            returnKeyType={'done'}
            maxLength={6}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
  },
  title: {
    color: 'rgba(60,60,67,60)',
    fontSize: 13,
    marginBottom: 9,
    paddingLeft: 18,
  },
  section: {
    backgroundColor: 'white',
    borderColor: 'rgba(112,112,112,.5)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 18,
    paddingLeft: 18,
  },
  row: {
    marginBottom: 9,
    paddingBottom: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    paddingRight: 18,
  },
  rowBorderBottom: {
    borderColor: 'rgba(112,112,112,.5)',
    borderBottomWidth: 1,
  },
  row__title: {
    fontSize: 18,
  },
  row__value: {
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 3,
  },
  row__icon: {
    color: 'rgba(112,112,112,.5)',
  },
  textinput: {
    fontSize: 18,
  },
});

PaydaySettings.propTypes = {};

export default PaydaySettings;
