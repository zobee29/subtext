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
  const results = {}
  if (percent < 40) {
    results.mood = "NEGATIVE"
    results.color = "red"
    results.percent = Math.floor(percent / 40 * 100)
    results.image = require("./public/negativeEmoji.png")
  } else if (percent > 40 && percent < 60) {
    results.mood = "NEUTRAL"
    results.color = "grey"
    results.percent =  Math.floor(percent / 60 * 100)
    results.image = require("./public/neutralEmoji.png")
  } else {
    results.mood = "POSITIVE"
    results.color = "green"
    results.percent =  Math.floor(percent)
    results.image = require("./public/positiveEmoji.png")
  }
  return results
}

  render() {
    console.log('Our apps state', this.state)
    const results = this.formatResults()
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
              <View style={[styles.left, {backgroundColor: results.color}]}>
                <Text style={styles.percent}>{results.percent}%</Text>
                <Text style={styles.mood}>{results.mood}</Text>
              </View>
              <View style={[styles.right]}>
                <Image source={results.image} style={styles.emoji}/>
              </View>
              </View>
            <View style={[styles.bottom]}>
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
    width: 400,
    backgroundColor: 'brown'
  },

  top: {
    flex: 3,
    flexDirection: 'row'
  },

  left: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
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
  },

  percent: {
    fontSize: 70,
    color: 'white',
    marginLeft: 15
  },

  mood: {
    fontSize: 30,
    color: 'white',
    marginLeft: 15
  },

  emoji: {
    height: 175,
    width: 175
  }
});
