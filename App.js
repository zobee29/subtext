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
      mood: ''
    }
  }

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

formatResults = () => {
  const percent = Math.floor(this.state.feedback * 100)
  if (percent < 40) {
    this.setState({
      mood: 'NEGATIVE'
    })
    return Math.floor(percent / 40 * 100)
  } else if (percent > 40 && percent < 60) {
    this.setState({
      mood: 'NEUTRAL'
    })
    return Math.floor(percent / 60 * 100)
  } else {
    this.setState({
      mood: 'POSITIVE'
    })
    return Math.floor(percent)
  }
}

  render() {
    console.log('Our apps state', this.state)
    const percent = this.formatResults()
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
                <Text>{percent}%</Text>
                <Text>{this.state.mood}</Text>
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
    height: 500,
    width: 400
  },

  top: {
    flex: 3,
    flexDirection: 'row'
  },

  left: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'column'
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
    flex: 4
  }
});
