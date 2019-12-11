import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, Dimensions, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Constants, apisAreAvailable } from 'expo';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class StudentRequest extends React.Component {

  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount(){

  }
  
  state = {
     name: '',
      phoneNumber: '',
      email: '',
      time: '',

      calendarDisplay: 'none',
      studentDashDisplay: 'none',
      studentRequestDisplay: 'block',
}

handleNameChange = name => {
    this.setState({ name });
};
handlePhoneNumberChange = phoneNumber => {
    this.setState({ phoneNumber });
};
handleEmailChange = email => {
    this.setState({ email });
};
handleTimeChange = time => {
    this.setState({ time });
};

handleSubmitPress = () => {
    Actions.ConfirmationPage({userData: this.props.userData});
}

handleBackArrowPress = () => {
    Actions.TeacherCalendar({userData: this.props.userData});
  }

  render() {
    return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <View style={{ display: this.state.studentRequestDisplay}}>
            <View style={styles.topBar}>
                    <Text style={styles.title}>
                        Schedule a Lesson
                    </Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.promptText}>
                    Name
                </Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    style={styles.inputText}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.promptText}>
                    Phone Number
                </Text>
                <TextInput
                    value={this.state.phoneNumber}
                    onChangeText={this.handlePhoneNumberChange}
                    style={styles.inputText}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.promptText}>
                    Email
                </Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    style={styles.inputText}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.promptText}>
                    from to (12 - 1 PM)
                </Text>
                <TextInput
                    value={this.state.time}
                    onChangeText={this.handleTimeChange}
                    style={styles.inputText}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    onPress={this.handleSubmitPress}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Submit
                    </Text>
                </TouchableHighlight>  
            </View>
          </View>
      </View>
      </KeyboardAwareScrollView>
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
  topBar: {
      height: deviceHeight/6,
      width: deviceWidth,
      backgroundColor: '#274156',
      flexDirection: 'row',
      alignItems: 'center',
  },
  backArrow: {
    height: 24,
    width: 24,
    marginRight: 45,
    marginLeft: 10,
},
  title: {
      fontSize: 24,
      marginLeft: 10,
      fontFamily: 'HelveticaNeue-Medium',
      color: 'white',
  },
  inputContainer:{
      height: deviceHeight/8,
      width: deviceWidth,
      borderBottomColor: '#5b5b5b',
  },
  promptText: {
    fontSize: 18,
    color: '#5b5b5b',
    fontFamily: 'HelveticaNeue-Light',
    marginTop: 20,
    marginLeft: 10,
  },
  inputText: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 24,
    fontFamily: 'HelveticaNeue-Medium',
    color: '#2c2828',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  buttonContainer: {
    height: (deviceHeight/6)*2,
    width: deviceWidth,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button:{
    width: deviceWidth/5,
    height: deviceWidth/6,
    backgroundColor: '#274156',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: 'bold',
  },
});


//this lets the component get imported other places
export default StudentRequest;