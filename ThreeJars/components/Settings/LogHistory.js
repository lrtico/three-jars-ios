import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const DATA = [
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

const Item = ({jar, date, details, amount, total}) => (
  <View style={[styles.row, styles.item__row]}>
    <View style={styles.details}>
      <Text style={styles.jar}>{jar} jar</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
    <Text style={styles.amount}>{amount}</Text>
    <Text style={styles.total}>{total}</Text>
  </View>
);

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: 'rgba(112,112,112,.5)',
      }}
    />
  );
};

const LogHistory = (props) => {
  const {logData, logDataFilter, handleLogDataFilter} = props;
  const renderItem = ({item}) => (
    <Item
      jar={item.jar}
      date={item.date}
      details={item.details}
      amount={item.amount}
      total={item.total}
    />
  );
  // console.log('LogHistory props = ', props);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log history</Text>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => handleLogDataFilter(text)}
        value={logDataFilter}
        clearButtonMode={'while-editing'}
        style={styles.filter}
      />
      <View style={[styles.row, styles.item__row, styles.row__header]}>
        <Text style={[styles.headrow, styles.details]}>Details</Text>
        <Text style={[styles.headrow, styles.amount]}>Amount</Text>
        <Text style={[styles.headrow, styles.total]}>Total</Text>
      </View>
      <FlatList
        data={logData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 9,
  },
  title: {
    color: 'rgba(60,60,67,60)',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
  },
  headrow: {
    color: '#8A8A8E',
    fontSize: 15,
    flexDirection: 'row',
  },
  item__row: {
    paddingBottom: 12,
    paddingTop: 12,
  },
  row__header: {
    borderBottomColor: 'rgba(112,112,112,.5)',
    borderBottomWidth: 1,
  },
  details: {
    width: '60%',
  },
  amount: {
    width: '15%',
  },
  total: {
    fontWeight: 'bold',
    paddingRight: 9,
    textAlign: 'right',
    width: '25%',
  },
  jar: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  filter: {
    backgroundColor: 'rgba(118,118,128,.12)',
    borderRadius: 6,
    marginBottom: 18,
    padding: 9,
  },
});

LogHistory.propTypes = {
  jar: PropTypes.string,
  date: PropTypes.string,
  details: PropTypes.string,
  amount: PropTypes.number,
  total: PropTypes.number,
};

export default LogHistory;
