import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const Log = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.row}>
          <Pressable
            style={styles.row__wrapper}
            onPress={() => navigation.navigate('Payday')}>
            <Text style={styles.row__title}>Log</Text>
            <Icon
              name="arrow-forward-ios"
              size={18}
              color="#7a7a7a"
              style={styles.iconcontrol}
            />
          </Pressable>
        </View>
      </View>
      <Text style={styles.row__description}>
        See a history of all the transactions
      </Text>
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
  row__icon: {
    color: 'rgba(112,112,112,.5)',
    marginLeft: 'auto',
  },
  row__description: {
    color: 'rgba(112,112,112,.5)',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 9,
  },
});

Log.propTypes = {};

export default Log;
