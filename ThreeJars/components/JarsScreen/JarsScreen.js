import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const JarsScreen = (props) => {
  // console.log('Jarsscreen props, ', props);
  const {
    spendJarValue,
    saveJarValue,
    shareJarValue,
    handleActiveJar,
    navigation,
  } = props;
  return (
    <SafeAreaView style={styles.jarswrapper}>
      <View style={styles.jarswrapper}>
        <View style={styles.header}>
          <View style={styles.header__circle}>
            <Text style={styles.header__circle__name}>aj</Text>
          </View>
          <Pressable
            style={styles.header__menu}
            onPress={() => navigation.navigate('Settings')}>
            <Icon name="menu" size={45} style={styles.iconcontrol} />
          </Pressable>
        </View>
        <View style={[styles.jar, styles.jarspend]}>
          <View style={styles.jar__controls}>
            <Icon
              name="add"
              size={45}
              style={[styles.iconcontrol, styles.jar__control]}
              onPress={() => handleActiveJar(props, 'spend', 'add')}
            />
            <Icon
              name="remove"
              size={45}
              style={[styles.iconcontrol, styles.jar__control]}
              onPress={() => handleActiveJar(props, 'spend', 'minus')}
            />
          </View>
          <View style={styles.jar__amount}>
            <View style={styles.jar__amount__wrap}>
              <Text
                style={
                  spendJarValue < 0
                    ? [
                        styles.jar__amount__dollarsign,
                        styles.jar__amount__dollarsignnegative,
                      ]
                    : styles.jar__amount__dollarsign
                }>
                {spendJarValue < 0 ? '-$' : '$'}
              </Text>
              <Text style={styles.jar__amount__dollars}>
                {spendJarValue < 0 ? spendJarValue * -1 : spendJarValue}
              </Text>
            </View>
          </View>
          <Text style={styles.jar__label}>Spend</Text>
        </View>
        <View style={[styles.jar, styles.jarsave]}>
          <View style={styles.jar__controls}>
            <Icon
              name="add"
              size={45}
              style={[styles.iconcontrol, styles.jar__control]}
              onPress={() => handleActiveJar(props, 'save', 'add')}
            />
            <Icon
              name="remove"
              size={45}
              style={[styles.iconcontrol, styles.jar__control]}
              onPress={() => handleActiveJar(props, 'save', 'minus')}
            />
          </View>
          <View style={styles.jar__amount}>
            <View style={styles.jar__amount__wrap}>
              <Text
                style={
                  saveJarValue < 0
                    ? [
                        styles.jar__amount__dollarsign,
                        styles.jar__amount__dollarsignnegative,
                      ]
                    : styles.jar__amount__dollarsign
                }>
                {saveJarValue < 0 ? '-$' : '$'}
              </Text>
              <Text style={styles.jar__amount__dollars}>
                {saveJarValue < 0 ? saveJarValue * -1 : saveJarValue}
              </Text>
            </View>
          </View>
          <Text style={styles.jar__label}>Save</Text>
        </View>
        <View style={[styles.jar, styles.jarshare]}>
          <View style={styles.jar__controls}>
            <Icon
              name="add"
              size={45}
              style={[styles.iconcontrol, styles.jar__control]}
              onPress={() => handleActiveJar(props, 'share', 'add')}
            />
            <Icon
              name="remove"
              size={45}
              style={[styles.iconcontrol, styles.jar__control]}
              onPress={() => handleActiveJar(props, 'share', 'minus')}
            />
          </View>
          <View style={styles.jar__amount}>
            <View style={styles.jar__amount__wrap}>
              <Text
                style={
                  shareJarValue < 0
                    ? [
                        styles.jar__amount__dollarsign,
                        styles.jar__amount__dollarsignnegative,
                      ]
                    : styles.jar__amount__dollarsign
                }>
                {shareJarValue < 0 ? '-$' : '$'}
              </Text>
              <Text style={styles.jar__amount__dollars}>
                {shareJarValue < 0 ? shareJarValue * -1 : shareJarValue}
              </Text>
            </View>
          </View>
          <Text style={styles.jar__label}>Share</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    color: '#4a4a4a',
    flexGrow: 1,
  },
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
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    marginBottom: 9,
    padding: 18,
  },
  header__circle: {
    backgroundColor: '#F7E665',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 72,
  },
  header__circle__name: {
    color: '#4A4A4A',
    fontFamily: 'Barlow-Regular',
    fontSize: 30,
    fontWeight: 'bold',
  },
  header__menu: {
    color: '#4A4A4A',
    position: 'absolute',
    right: 18,
  },
  jar: {
    color: 'white',
    flexGrow: 1,
    marginBottom: 9,
    padding: 18,
    paddingTop: 9,
    paddingBottom: 36,
  },
  jarsave: {
    backgroundColor: '#CF2B7A',
  },
  jarspend: {
    backgroundColor: '#4AA34E',
  },
  jarshare: {
    backgroundColor: '#24C3E3',
  },
  jar__controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jar__control: {
    color: 'white',
  },
  jar__amount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jar__amount__wrap: {
    flexDirection: 'row',
  },
  jar__amount__dollarsign: {
    color: 'white',
    fontFamily: 'Barlow-Regular',
    fontSize: 36,
    opacity: 0.5,
    position: 'absolute',
    left: -21,
    top: 21,
  },
  jar__amount__dollarsignnegative: {
    left: -33,
  },
  jar__amount__dollars: {
    color: 'white',
    fontFamily: 'Barlow-Regular',
    fontSize: 104,
    lineHeight: 100,
  },
  jar__label: {
    color: 'white',
    fontFamily: 'Barlow-Bold',
    fontSize: 24,
    marginTop: -9,
    textAlign: 'center',
  },
});

export default JarsScreen;
