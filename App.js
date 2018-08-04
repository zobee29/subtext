import React from 'react';
import { Text, View, Image, TextInput, Alert} from 'react-native';
import { Form, Button } from 'native-base';
import axios from 'axios'
import Modal from 'react-native-modalbox'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from './public'
import formatResults from "./textFunctions.js"


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




  render() {
    console.log('Our apps state', this.state)
    const results = formatResults(this.state.feedback, this.state.text)
    return (
        <View style={styles.container}>
        <Image source={require('./public/subText_logo.png')} style={styles.logo}/>
          <Form rounded style={styles.form}> 
            <TextInput style={styles.textArea} multiline={true} placeholder="Find out what they think you'll mean" onChangeText={(text) => this.setState({text})} value={this.state.text}/>
            <Button block info style={styles.button} onPress={this.handleOnPress}>
              <Text style={styles.buttonText}>Generate Report</Text>
            </Button>
            <Button block info style={styles.button} onPress={() => this.setState({text: ''})}>
              <Text style={styles.buttonText}>Clear</Text>
            </Button>
          </Form>
          <Modal
            style={[styles.modal]}
            ref={"modal"}
            coverScreen={true}
            >
            <View style={[styles.top]}>
              <View style={[styles.left, {backgroundColor: results.color}]}>
                <Text style={styles.percent}>{results.percent}%</Text>
                <Text style={styles.mood}>{results.mood}</Text>
              </View>
              <View style={[styles.right, {backgroundColor: results.emojiColor}]} >
                <Image source={results.image} style={styles.emoji}/>
              </View>
              </View>
            <View style={[styles.bottom]}>
              <Text style={styles.messageText}>"{results.input}"</Text>
              <Text style={styles.resultsText}>{results.text}</Text>
            </View>
          </Modal>
           <KeyboardSpacer /> 
          </View>
    );
  }
}
