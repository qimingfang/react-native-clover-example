/* global alert */

import React, { Component, PropTypes } from 'react'
import {
  DeviceEventEmitter,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import {Provider, connect} from 'react-redux'
import Clover from './components/clover'
import * as actions from './actions'

import store from './store'

const {width, height} = Dimensions.get('window')

class ReactNativeCloverClass extends Component {
  onBarcode (barcode) {
    const data = JSON.parse(barcode)
    this.props.refer(data._id)
    alert(`Thanks ${data.claimingCustomer.name}. Reward from ${data.referringCustomer.name} applied.`)
  }

  componentWillMount () {
    DeviceEventEmitter.addListener('onBarcode', this.onBarcode.bind(this))
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../images/shop.jpg')} style={styles.backgroundImage} />
        <View style={{
          position: 'absolute',
          width,
          height,
          backgroundColor: '#000',
          opacity: 0.5
        }} />
        <View style={{
          position: 'absolute',
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16
          }}>
            <Text style={styles.welcome}>
              Welcome to Happy Donuts
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#4CAF50', width: 300, height: 50,
                alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
              onPress={() => Clover.show()}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Scan Loyalty Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

ReactNativeCloverClass.propTypes = {
  refer: PropTypes.func.isRequired
}

const ReactNativeClover = connect(
  state => ({

  }), {
    refer: actions.refer
  }
)(ReactNativeCloverClass)

class Main extends Component {
  render () {
    return (
      <Provider store={store}>
        <ReactNativeClover />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

export default Main
