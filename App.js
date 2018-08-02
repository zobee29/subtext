import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Container, Header, Content, Input, Item, Form, Textarea, Button } from 'native-base';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }
  render() {
    console.log('Our apps state', this.state)
    return (
      <View style={styles.container}>
        <Image source={require('./public/subText_logo.png')} style={styles.image}/>
          <Form rounded style={{marginTop: 40, marginLeft: 20, marginRight: 20}}> 
            <Textarea rowSpan={8} style={{fontSize: 20}} placeholder="Find out what they think you'll mean"/>
            <Button block info style={{marginTop: 200}}>
              <Text style={{color: 'white'}}>Generate Report</Text>
            </Button>
          </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 100,
    marginTop: 50,
  }
});
