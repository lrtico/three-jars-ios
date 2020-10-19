import React from 'react';
import {StyleSheet, Text, View, Button, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const WeeklyAllowanceSettings = (props) => {
  // console.log('WeeklyAllowanceSettings props = ', props);
  const {
    navigation,
    spendJarPercent,
    saveJarPercent,
    shareJarPercent,
    paydayIsEnabled,
    showJarPercentCheck,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEEKLY ALLOWANCE SETTINGS</Text>
      <View style={styles.section}>
        <View style={[styles.row, styles.rowBorderBottom]}>
          <Pressable
            style={styles.row__wrapper}
            onPress={() => navigation.navigate('Payday')}>
            <Text style={styles.row__title}>Payday</Text>
            <Text style={styles.row__value}>
              {paydayIsEnabled ? 'On' : 'Off'}
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
          <Pressable
            style={styles.row__wrapper}
            onPress={() => navigation.navigate('JarPercentages')}>
            <Text style={styles.row__title}>Jar Percentages</Text>
            <Text style={styles.row__value}>
              {showJarPercentCheck === true
                ? `Percent doesn't = 100`
                : `${spendJarPercent} / ${saveJarPercent} / ${shareJarPercent}`}
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={18}
              color="#7a7a7a"
              style={styles.iconcontrol}
            />
          </Pressable>
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
});

export default WeeklyAllowanceSettings;
