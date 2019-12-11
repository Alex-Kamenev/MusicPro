import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, Dimensions, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Constants, apisAreAvailable } from 'expo';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class ConfirmationPage extends React.Component {

  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount(){

  }

handleOKPress = () => {
    Actions.StudentDash({userData: this.props.userData});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
            Your request has been submitted! 
        </Text>
        <TouchableHighlight
            onPress={this.handleOKPress}
            style={styles.button}
        >
            <Text style={styles.buttonText}>
                OK
            </Text>
        </TouchableHighlight>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',

  },
  title: {
    fontSize: 26,
    fontFamily: 'HelveticaNeue-Medium',
    color: 'black',
    textAlign: 'center',
    margin: 20,
},
  button:{
    width: deviceWidth/5,
    height: deviceWidth/6,
    backgroundColor: '#274156',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: 'bold',
  },
});

//this lets the component get imported other places
export default ConfirmationPage;
