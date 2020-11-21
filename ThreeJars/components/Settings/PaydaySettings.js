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
  // console.log('PaydaySettings props = ', props);
  const {
    navigation,
    paydayIsEnabled,
    handlePaydayIsEnabled,
    paydayAmount,
    handlePaydayAmount,
    isSelectedPayday,
    isDisabledPaydayManually,
    paydayTime,
    handlePayManually,
    handlePaydaySMSNumber,
    paydaySMSNumber,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={[styles.row, styles.rowBorderBottom]}>
          <Text style={styles.row__title}>Enable automatic payday</Text>
          <Switch
            trackColor={{false: '#767577', true: '#34C759'}}
            thumbColor={paydayIsEnabled ? 'white' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handlePaydayIsEnabled}
            value={paydayIsEnabled}
          />
        </View>
        <View style={[styles.row, styles.rowBorderBottom]}>
          <Text style={styles.row__title}>Allowance amount ($)</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => handlePaydayAmount(text)}
            value={paydayAmount}
            placeholder={'Enter amount'}
            clearButtonMode={'never'}
            keyboardType={'numeric'}
            returnKeyType={'done'}
            maxLength={6}
          />
        </View>
        <View>
          <Pressable
            style={[styles.row, styles.rowBorderBottom]}
            onPress={() => navigation.navigate('ChoosePayday')}>
            <Text style={styles.row__title}>Day</Text>
            <Text
              style={[styles.row__value, styles.row__icon, styles.alignRight]}>
              {`${isSelectedPayday}`}
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={18}
              color="#7a7a7a"
              style={styles.iconcontrol}
            />
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.row__title}>Parent's phone number</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => handlePaydaySMSNumber(text)}
            value={paydaySMSNumber}
            placeholder={'Enter number'}
            clearButtonMode={'never'}
            keyboardType={'phone-pad'}
            returnKeyType={'done'}
            maxLength={10}
          />
        </View>
      </View>
      <View style={styles.button__row}>
        <Pressable
          onPress={() => handlePayManually(props)}
          disabled={isDisabledPaydayManually === true ? true : false}
          style={
            isDisabledPaydayManually === true
              ? [styles.button__disabled, styles.button__wrap]
              : ({pressed}) => [
                  {backgroundColor: pressed ? '#029326' : '#34C759'},
                  styles.button__wrap,
                ]
          }>
          <Text style={styles.button__text}>Pay allowance manually</Text>
        </Pressable>
      </View>
      <Text style={styles.row__description}>
        Automatically add your saved percentages of the payday amount above to
        each jar.
      </Text>
      {isDisabledPaydayManually && (
        <View style={{marginLeft: 60, marginRight: 60}}>
          <Text
            style={{
              marginBottom: 9,
              marginTop: 36,
            }}>
            😋 Nice try! You've already been paid this week.
          </Text>
        </View>
      )}
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
    marginLeft: 3,
    marginRight: 3,
  },
  row__icon: {
    color: 'rgba(112,112,112,.5)',
  },
  row__description: {
    color: 'rgba(112,112,112,.5)',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 9,
    textAlign: 'center',
    width: 350,
  },
  alignRight: {marginLeft: 'auto'},
  textinput: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  button__row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 72,
  },
  button__wrap: {
    // backgroundColor: '#34C759',
    borderRadius: 9,
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  button__disabled: {
    backgroundColor: 'gray',
  },
  button__text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 9,
  },
});

PaydaySettings.propTypes = {
  navigation: PropTypes.object,
  paydayIsEnabled: PropTypes.bool,
  handlePaydayIsEnabled: PropTypes.func,
  isDisabledPaydayManually: PropTypes.bool,
};

export default PaydaySettings;
