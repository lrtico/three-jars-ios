import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Button, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import {SafeAreaView} from 'react-native-safe-area-context';

const JarPercentages = (props) => {
  const {
    handleJarPercentage,
    spendJarPercent,
    maxSpendJarPercent,
    saveJarPercent,
    maxSaveJarPercent,
    shareJarPercent,
    maxShareJarPercent,
    showJarPercentError,
    handleVerifyJarPercentage,
  } = props;
  // console.log('JarPercentages props = ', props);
  const spendJarRef = useRef('spendJar');
  const saveJarRef = useRef('saveJar');
  const shareJarRef = useRef('shareJar');
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>SPEND JAR</Text>
          <View style={styles.row__slider}>
            <Slider
              style={{height: 51, width: 300}}
              minimumValue={0}
              maximumValue={maxSpendJarPercent}
              minimumTrackTintColor="#34C759"
              // maximumTrackTintColor="#000000"
              step={1}
              thumbTintColor="#34C759"
              value={spendJarPercent}
              onValueChange={(val) => handleJarPercentage(val, spendJarRef)}
            />
            <Text style={styles.row__value}>{spendJarPercent}%</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>SAVE JAR</Text>
          <View style={styles.row__slider}>
            <Slider
              style={{height: 51, width: 300}}
              minimumValue={0}
              maximumValue={maxSaveJarPercent}
              minimumTrackTintColor="#34C759"
              step={1}
              thumbTintColor="#34C759"
              value={saveJarPercent}
              onValueChange={(val) => handleJarPercentage(val, saveJarRef)}
            />
            <Text style={styles.row__value}>{saveJarPercent}%</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>SHARE JAR</Text>
          <View style={styles.row__slider}>
            <Slider
              style={{height: 51, width: 300}}
              minimumValue={0}
              maximumValue={maxShareJarPercent}
              minimumTrackTintColor="#34C759"
              thumbTintColor="#34C759"
              value={shareJarPercent}
              onValueChange={(val) => handleJarPercentage(val, shareJarRef)}
            />
            <Text style={styles.row__value}>{shareJarPercent}%</Text>
          </View>
        </View>
        <View style={[styles.button__row, styles.row]}>
          <Pressable
            onPress={handleVerifyJarPercentage}
            style={({pressed}) => [
              {backgroundColor: pressed ? '#029326' : '#34C759'},
              styles.button__wrap,
            ]}>
            <Text style={styles.button__text}>Apply</Text>
          </Pressable>
        </View>
        {showJarPercentError && (
          <View style={styles.percentage__error}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 9,
              }}>
              The percents you choose didn't equal 100.
            </Text>
            <Text style={{marginBottom: 9}}>
              We've reset the values for you. Please try changing the percents
              to equal 100 and click apply again. :{')'}
            </Text>
            <Text>
              {'('}For example - 55%, 40%, 5%.{')'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    marginBottom: 36,
  },
  button__row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
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
  button__text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 9,
  },
  row__slider: {
    backgroundColor: 'white',
    borderColor: 'rgba(112,112,112,.5)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingLeft: 18,
  },
  title: {
    color: 'rgba(60,60,67,60)',
    fontSize: 13,
    marginBottom: 9,
    paddingLeft: 18,
  },
  row__value: {
    color: 'rgba(112,112,112,.5)',
    fontSize: 18,
    marginLeft: 18,
    marginRight: 18,
  },
  percentage__error: {
    marginLeft: 60,
    marginRight: 60,
  },
});

JarPercentages.propTypes = {
  spendJarPercent: PropTypes.number,
  saveJarPercent: PropTypes.number,
  shareJarPercent: PropTypes.number,
  handleJarPercentage: PropTypes.func,
};

export default JarPercentages;
