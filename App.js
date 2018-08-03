import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, ScrollView, DeviceEventEmitter } from 'react-native';
import { Container, Header, Content, Input, Item, Form, Textarea, Button } from 'native-base';
import axios from 'axios'
import Modal from 'react-native-modalbox'
import KeyboardSpacer from 'react-native-keyboard-spacer';


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      feedback: {},
    }
  }

  // componentWillMount () {
  //   this.keyboardDidShowListener = DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
  //   this.keyboardDidHideListener = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  // }

  // componentWillUnmount () {
  //   this.keyboardDidShowListener.remove()
  //   this.keyboardDidHideListener.remove()
  // }

  // keyboardDidShow (e) {
  //   let newSize = Dimensions.get('window').height - e.endCoordinates.height
  //   this.setState({
  //     visibleHeight: newSize,
  //     topLogo: {width: 100, height: 70}
  //   })
  // }

  // keyboardDidHide (e) {
  //   this.setState({
  //     visibleHeight: Dimensions.get('window').height,
  //     topLogo: {width: Dimensions.get('window').width}
  //   })
  // }  

handleOnPress = async () => {
  if(this.state.text){
  await this.sendData(this.state.text)
  this.refs.modal.open()
  } else {
    Alert.alert("Hold up!","Please enter text!")
  }
}

sendData = async (text) => {
  try{
  const data = await axios.post(
    'https://apiv2.indico.io/sentimenthq',
    JSON.stringify({
      'api_key': "3f58c49779f1a00d19e00cc8feaed15a",
      'data': text
    })
  )

  this.setState({
    feedback: data.data.results,
  })
  } catch (error){
    console.error(error)
  }
}

  render() {
    console.log('Our apps state', this.state)
    return (
      // <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container}>
        <Image source={require('./public/subText_logo.png')} style={styles.logo}/>
          <Form rounded style={styles.form}> 
            <Textarea rowSpan={8} style={styles.textArea} placeholder="Find out what they think you'll mean" onChangeText={(text) => this.setState({text})}/>
            <Button block info style={styles.button} onPress={this.handleOnPress}>
              <Text style={styles.buttonText}>Generate Report</Text>
            </Button>
          </Form>
          <Modal
            style={[styles.modal]}
            ref={"modal"}
            coverScreen={true}
            >
            {/* <Text>{this.state.feedback}</Text> */}
            <View style={[styles.top]}>
              <View style={[styles.left]}>
                <Text>Hello from left</Text>
              </View>
              <View style={[styles.right]}>
                <Text>Hello from right</Text>
              </View>
              </View>
            <View style={[styles.bottom]}>
              <Text>Hello from bottom</Text>
            </View>
          </Modal>
           <KeyboardSpacer /> 
          </View>
      // </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  logo: {
    width: 200,
    height: 100,
    marginBottom: 60
    // marginTop: 50,
  },

  form: {
    // marginTop: 40,
    marginHorizontal: 20,
  },

  textArea: {
    fontSize: 20
  },

  button: {

  },

  buttonText: {
    color: 'white',
    marginHorizontal: 40
  },

  modal: {
  },

  top: {
    flex: 1,
  },

  left: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1
  },

  right: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1
  },

  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'brown',
    flex: 1
  }
});
