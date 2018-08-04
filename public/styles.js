export default styles = StyleSheet.create({
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
      borderStyle: 'solid',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      elevation: 20,
      marginTop: 10,
      padding: 15,
      marginBottom: 10,
      textAlign: 'center',
      textAlignVertical: 'top',
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
      backgroundColor: 'transparent'
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
      textAlign: 'center',
      textAlignVertical: 'top',
      fontSize: 20,
      color: 'white',
    }, 
    resultsText: {
      textAlignVertical: 'top',
      fontSize: 20,
      color: 'white',
      marginTop: 30,
      padding: 5,
    }
  });
