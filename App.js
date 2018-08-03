import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Container, Header, Content, Input, Item, Form, Textarea, Button } from 'native-base';
import axios from 'axios'
import Modal from 'react-native-modalbox'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      feedback: {}
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
      <View style={styles.container}>
        <Image source={require('./public/subText_logo.png')} style={styles.logo}/>
          <Form rounded style={styles.form}> 
            <Textarea rowSpan={8} style={styles.textArea} placeholder="Find out what they think you'll mean" onChangeText={(text) => this.setState({text})}/>
            <Button block info style={styles.button} onPress={()=>this.sendData(this.state.text)}>
              <Text style={styles.buttonText}>Generate Report</Text>
            </Button>
          </Form>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  }
});
