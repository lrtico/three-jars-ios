import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, View, Text, Pressable} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const JarMinus = (props) => {
  console.log('JarMinus props = ', props);
  const {
    activeJar,
    spendJarValue,
    spendJarNewValue,
    spendJarNote,
    saveJarValue,
    saveJarNewValue,
    saveJarNote,
    shareJarValue,
    shareJarNewValue,
    shareJarNote,
    isDisabledMinusButton,
    handleJarNote,
    handleJarValue,
    handleIncomingJarValue,
    handleCancelJarValue,
  } = props;

  return (
    <SafeAreaView style={styles.jarswrapper}>
      <View
        style={
          activeJar === 'spend'
            ? {backgroundColor: '#4AA34E'}
            : activeJar === 'save'
            ? {backgroundColor: '#CF2B7A'}
            : {backgroundColor: '#24C3E3'}
        }>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Barlow-Regular',
            textAlign: 'center',
            marginBottom: 9,
            marginTop: 27,
            textTransform: 'capitalize',
          }}>
          {activeJar} Jar
        </Text>
      </View>
      <View
        style={
          activeJar === 'spend'
            ? [styles.wrapper, {backgroundColor: '#4AA34E'}]
            : activeJar === 'save'
            ? [styles.wrapper, {backgroundColor: '#CF2B7A'}]
            : [styles.wrapper, {backgroundColor: '#24C3E3'}]
        }>
        <View style={styles.amountwrapper}>
          <TextInput
            style={styles.amount}
            onChangeText={(text) =>
              activeJar === 'spend'
                ? handleIncomingJarValue(text, 'spend', 'minus')
                : activeJar === 'save'
                ? handleIncomingJarValue(text, 'save', 'minus')
                : handleIncomingJarValue(text, 'share', 'minus')
            }
            placeholder={'$'}
            clearButtonMode={'never'}
            keyboardType={'numeric'}
            returnKeyType={'done'}
            maxLength={6}
          />
        </View>
        <View style={styles.notewrapper}>
          <Text style={styles.notelabel}>Note:</Text>
          <TextInput
            style={styles.note}
            onChangeText={(text) => handleJarNote(text)}
            value={
              activeJar === 'spend'
                ? spendJarNote
                : activeJar === 'save'
                ? saveJarNote
                : shareJarNote
            }
            clearButtonMode={'never'}
            returnKeyType={'done'}
            maxLength={100}
          />
        </View>
        <View
          style={{
            marginTop: 54,
            textAlign: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            disabled={isDisabledMinusButton}
            onPress={
              activeJar === 'spend'
                ? () => handleJarValue(props, 'spend')
                : activeJar === 'save'
                ? () => handleJarValue(props, 'save')
                : () => handleJarValue(props, 'share')
            }
            style={
              isDisabledMinusButton
                ? [styles.buttondisabled, {textAlign: 'center'}]
                : [styles.button, {textAlign: 'center'}]
            }>
            <Text
              style={
                activeJar === 'spend'
                  ? [styles.button__text, {color: '#4AA34E'}]
                  : activeJar === 'save'
                  ? [styles.button__text, {color: '#CF2B7A'}]
                  : [styles.button__text, {color: '#24C3E3'}]
              }>
              Minus
            </Text>
          </Pressable>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Barlow-Regular',
              fontSize: 16,
              marginTop: 27,
              marginBottom: 6,
              textAlign: 'center',
            }}>
            {activeJar === 'spend'
              ? `Spend Jar current total: $${spendJarValue}`
              : activeJar === 'save'
              ? `Save Jar current total: $${saveJarValue}`
              : `Share Jar current total: $${shareJarValue}`}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Barlow-Regular',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {activeJar === 'spend'
              ? `Spend Jar new total: $${spendJarNewValue}`
              : activeJar === 'save'
              ? `Save Jar new total: $${saveJarNewValue}`
              : `Share Jar new total: $${shareJarNewValue}`}
          </Text>
        </View>
      </View>
      <View style={styles.backwrapper}>
        <Pressable
          onPress={() => handleCancelJarValue(props)}
          style={{alignItems: 'center'}}>
          <Icon
            name="close"
            size={45}
            style={[styles.iconcontrol, styles.jar__control]}
          />
          <Text style={{fontFamily: 'Barlow-Regular', fontSize: 16}}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  jarswrapper: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
  },
  iconcontrol: {
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 1.5},
    shadowOpacity: 0.5,
    shadowRadius: 1.25,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 18,
    paddingRight: 18,
  },
  notewrapper: {
    flexDirection: 'row',
    marginTop: 36,
  },
  notelabel: {
    color: 'white',
    fontFamily: 'Barlow-Regular',
    fontSize: 18,
  },
  note: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    flex: 1,
    fontSize: 18,
    fontFamily: 'Barlow-Regular',
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  amountwrapper: {
    alignItems: 'center',
  },
  amount: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 104,
    fontFamily: 'Barlow-Regular',
    marginVertical: 36,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 36,
    flexGrow: 0,
    paddingHorizontal: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2.25,
    width: 120,
  },
  buttondisabled: {
    backgroundColor: '#ccc',
    borderRadius: 36,
    flexGrow: 0,
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: 120,
  },
  button__text: {
    fontFamily: 'Barlow-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backwrapper: {
    alignItems: 'center',
    paddingVertical: 54,
  },
});

JarMinus.propTypes = {
  activeJar: PropTypes.string,
  spendJarNote: PropTypes.string,
  spendJarValue: PropTypes.number,
  spendJarNewValue: PropTypes.number,
  saveJarValue: PropTypes.number,
  saveJarNewValue: PropTypes.number,
  saveJarNote: PropTypes.string,
  shareJarValue: PropTypes.number,
  shareJarNewValue: PropTypes.number,
  shareJarNote: PropTypes.string,
  isDisabledMinusButton: PropTypes.bool,
  handleJarNote: PropTypes.func,
  handleJarValue: PropTypes.func,
  handleIncomingJarValue: PropTypes.func,
  handleCancelJarValue: PropTypes.func,
};

export default JarMinus;
