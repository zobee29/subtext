import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, ScrollView, DeviceEventEmitter } from 'react-native';
import { Container, Header, Content, Input, Item, Form, Textarea, Button } from 'native-base';
import axios from 'axios'
import Modal from 'react-native-modalbox'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';


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
  
  idiotCheck = (text) => {
    if(text.toLowerCase().search(" u ") > -1 && text.toLowerCase().search(" y ")) { return "\u2022 'Y' 'u' have to talk like this? Maybe write the words out. \n"}
      else if(text.toLowerCase().search(" u ") > -1) {return "\u2022 'U' know better than to talk like that, maybe write 'you' instead. \n"}
      else if(text.toLowerCase().search(" y ") > -1) {return "\u2022 'Y' do you talk like this? Maybe write 'why' instead \n"}
      else return ""
  }

shortenText = (text) => {
  if(text.length >= 60) {text = text.slice(0, 60)
  text = text.slice(0, text.lastIndexOf(" "))
  text = text + "..."}
  return text
}


formatResults = () => {
  const percent = Math.floor(this.state.feedback * 100)
  const results = {}
  if (percent < 40) {
    results.mood = "NEGATIVE"
    results.color = "red"
    results.emojiColor = "#ff3333"
    results.percent = Math.floor(percent / 40 * 100)
    results.image = require("./public/negativeEmoji.png")
  } else if (percent > 40 && percent < 60) {
    results.mood = "NEUTRAL"
    results.color = "grey"
    results.emojiColor = "lightgrey"
    results.percent =  Math.floor(percent / 60 * 100)
    results.image = require("./public/neutralEmoji.png")
  } else {
    results.mood = "POSITIVE"
    results.color = "green"
    results.emojiColor = "lightgreen"
    results.percent =  Math.floor(percent)
    results.image = require("./public/positiveEmoji.png")
  }

  results.input  = this.shortenText(this.state.text)
  results.text = this.adviceGenerator(this.state.text, results)
  return results
}

tooManyExclamationPoints = (text) => {
  let numOfExclamation = 0
  const amountOfWords = text.split(' ').length
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '!') numOfExclamation++  
  }
  if (numOfExclamation >= amountOfWords - 1 && numOfExclamation >= 3) {
    return "\u2022 Wow! you have used almost as many exclamation points as there are words in that text. Are you really that excited? \n"
  } else return ""
} 

likeCount = (text) => {
  let numOfLikes = 0
  const data = text.toLowerCase().split(' ')
  for(let i = 0; i < data.length; i++) {
     if(data[i].includes('like')) numOfLikes++
  }
  if(numOfLikes >= 3) {
    return `\u2022 You, like, have used the word "like" ${numOfLikes} times in this text. \n`
  } else return ""
}

adviceGenerator = (text, results) => {
  let adjectiveMood = "a "
  let lovehate = ""
  if(results.percent >= 90) adjectiveMood = "a very "
  else if ( results.percent <= 50 ) adjectiveMood = "a somewhat "
  if(text.toLowerCase().search("hate") > -1 && text.search("love") > -1){lovehate = "\u2022 Love and hate are strong words. Do you really mean it? \n"}
    else if(text.toLowerCase().search("hate") > -1){lovehate = "\u2022 Hate is a bit of a strong word though, do you really mean it? \n"}
    else if(text.toLowerCase().search("love") > -1){lovehate = "\u2022 Love is a bit of a strong word though, do you really mean it? \n"}
  let exclaim = this.tooManyExclamationPoints(text)
  let likelike = this.likeCount(text)
  let whyyou = this.idiotCheck(text)
  return("\u2022 " + "This text has " + adjectiveMood + results.mood.toLowerCase() + " tone to it. \n" + lovehate + exclaim + likelike + whyyou) 
}

  render() {
    console.log('Our apps state', this.state)
    const results = this.formatResults()
    return (
      // <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container}>
        <Image source={require('./public/subText_logo.png')} style={styles.logo}/>
          <Form rounded style={styles.form}> 
            <Animatable.View animation="slideInLeft">
              <TextInput style={styles.textArea} multiline={true} placeholder="How do you come across?" onChangeText={(text) => this.setState({text})} value={this.state.text}/>
            </Animatable.View>
            <Animatable.View animation="fadeIn">
            <Button block info style={styles.button} onPress={this.handleOnPress}>
              <Text style={styles.buttonText}>Generate Report</Text>
            </Button>
            </Animatable.View>
            <Animatable.View animation="fadeIn">
            <Button block info style={styles.button} onPress={() => this.setState({text: ''})}>
              <Text style={styles.buttonText}>Clear</Text>
            </Button>
            </Animatable.View>
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
      // </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#c2dcf2',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  logo: {
    width: 200,
    height: 100,
    marginTop: 40,
  },

  form: {
    marginHorizontal: 20,
  },

  textArea: {
    width: 300,
    height: 320,
    fontSize: 20,
    backgroundColor: 'white',
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 20,
    marginTop: 10,
    padding: 15,
    marginBottom: 10,
    textAlign: "center",
    textAlignVertical: "top",
  },

  button: {
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    marginHorizontal: 40
  },

  modal: {
    height: 500,
    width: 350,
    backgroundColor: "transparent"
  },

  top: {
    flex: 3,
    flexDirection: 'row'
  },

  left: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 20
  },

  right: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderTopRightRadius: 20
  },

  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64b1f1',
    flex: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  percent: {
    fontSize: 70,
    color: 'white',
  },

  mood: {
    fontSize: 30,
    color: 'white',
  },

  emoji: {
    height: 175,
    width: 175,
    padding: 20,
  },

  messageText: {
    textAlign: "center",
    textAlignVertical: "top",
    fontSize: 20,
    color: 'white',
  },

  resultsText: {
    textAlignVertical: "top",
    fontSize: 20,
    color: 'white',
    marginTop: 30,
    padding: 5,
  }

});
