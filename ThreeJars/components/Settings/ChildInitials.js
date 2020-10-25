import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const ChildInitials = (props) => {
  // console.log('ChildInitials props = ', props);
  const {childsInitials, handleSettingChildInitials} = props;
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.row__title}>Child's initials</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => handleSettingChildInitials(text)}
            value={childsInitials}
            placeholder={'2 characters max'}
            clearButtonMode={'never'}
            keyboardType={'default'}
            returnKeyType={'done'}
            maxLength={2}
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
  textinput: {
    fontSize: 18,
    textTransform: 'lowercase',
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

ChildInitials.propTypes = {
  childsInitials: PropTypes.string,
  handleSettingChildInitials: PropTypes.func,
};

export default ChildInitials;
