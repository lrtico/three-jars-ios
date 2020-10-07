import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Button, Pressable, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const PaydayDateTimeSettings = (props) => {
  // Datepicker
  // const [date, setDate] = useState(new Date());
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   let time = selectedDate.toLocaleTimeString([], {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  //   setDate(currentDate);
  //   console.log('time picker returns, ', time);
  // };

  const {
    isSelectedPaydaySunday,
    isSelectedPaydayMonday,
    isSelectedPaydayTuesday,
    isSelectedPaydayWednesday,
    isSelectedPaydayThursday,
    isSelectedPaydayFriday,
    isSelectedPaydaySaturday,
    handlePaydayOfTheWeek,
    handlePaydayTime,
    payDayPickerTime,
  } = props;
  console.log('PaydayDateTimeSettings props = ', props);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Day of the week</Text>
        <View style={styles.row__wrapper}>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Sunday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydaySunday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>Su</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Monday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydayMonday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>M</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Tuesday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydayTuesday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>Tu</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Wednesday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydayWednesday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>W</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Thursday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydayThursday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>Th</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Friday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydayFriday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>F</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePaydayOfTheWeek('Saturday')}
            style={({pressed}) => [
              {
                backgroundColor:
                  pressed || isSelectedPaydaySaturday ? '#34C759' : 'black',
              },
              styles.weekday,
            ]}>
            <Text style={styles.weekday__day}>S</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.title}>Time of day</Text>
          <DateTimePicker
            // testID="dateTimePicker"
            value={payDayPickerTime}
            mode="time"
            display="default"
            onChange={(event, date) => handlePaydayTime(event, date)}
            style={{width: 320, backgroundColor: 'white'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    paddingTop: 36,
  },
  title: {
    color: 'rgba(60,60,67,60)',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  section: {
    marginBottom: 36,
    paddingTop: 18,
    paddingLeft: 18,
  },
  row: {
    marginBottom: 9,
    paddingBottom: 9,
  },
  rowBorderBottom: {
    borderColor: 'rgba(112,112,112,.5)',
    borderBottomWidth: 1,
  },
  row__wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    paddingRight: 18,
  },
  row__title: {
    fontSize: 18,
  },
  row__value: {
    color: 'rgba(112,112,112,.5)',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 18,
  },
  row__icon: {
    color: 'rgba(112,112,112,.5)',
  },
  weekday: {
    // backgroundColor: 'black',
    borderRadius: 18,
    // borderWidth: 1,
    // borderColor: 'rgba(112,112,112,.5)',
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
  },
  weekday__day: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

PaydayDateTimeSettings.propTypes = {
  isSelectedPaydaySunday: PropTypes.bool,
  isSelectedPaydayMonday: PropTypes.bool,
  isSelectedPaydayTuesday: PropTypes.bool,
  isSelectedPaydayWednesday: PropTypes.bool,
  isSelectedPaydayThursday: PropTypes.bool,
  isSelectedPaydayFriday: PropTypes.bool,
  isSelectedPaydaySaturday: PropTypes.bool,
  handlePaydayOfTheWeek: PropTypes.func,
  handlePaydayTime: PropTypes.func,
  payDayPickerTime: PropTypes.object,
};

export default PaydayDateTimeSettings;
