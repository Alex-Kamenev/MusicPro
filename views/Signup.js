import React from 'react';
import { AppRegistry, View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, ImageBackground, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class Signup extends React.Component {

  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount(){

  }
  // ALEJANDRO, PLEASE START WORKING 
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    student: true,
  }

  studentPressed = () => {
    this.setState({
      student: true
    })
  }

  teacherPressed = () => {
    this.setState({
      student: false
    })
  }


  //firebase account creation and automatic login
  onDonePressed = () => {
    //if the passwords match
    if(this.state.password == this.state.confirmPassword){
      //this creates a database reference to copy the info to the database 
      var db = firebase.database();
      //this creates an accessible reference to this.state, we could also use .bind(this)
      var name = this.state.name;
      var email = this.state.email;
      //if the person is a student or a teacher
      if (this.state.student == true){
        //creates the user and adds them to the auth section of firebase
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          var errorMessage = error.message;
          alert(errorMessage);
        }).then(function() {
          //brings up the users data from auth 
          var user = firebase.auth().currentUser;
          //copies the users data from auth to the database, adding the name and whether they're a student or a teacher
          db.ref(`users/${user.uid}/info`).set({
            email: user.email,
            uid: user.uid,
            name: name,
            userType: "student"
          });
          Actions.StudentDash();
        });
      } else {
        //creates the user and adds them to the auth section of firebase
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          var errorMessage = error.message;
          alert(errorMessage);
        }).then(function() {
          //brings up the users data from auth 
          var user = firebase.auth().currentUser;
          //copies the users data from auth to the database, adding the name and whether they're a student or a teacher
          db.ref(`users/${user.uid}/info`).set({
            email: user.email,
            uid: user.uid,
            name: name,
            userType: "teacher"
          });
          Actions.TeacherDash();
        });
      }
    } else {
      alert("Make sure the passwords match!")
    }
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
        <ImageBackground
          style={styles.background}
          source={{ uri: 'https://wallpaperbro.com/img/53490.jpg' }}
        >
        {/* this is where the student/teacher selector goes */}
        <Text style={styles.startText}> 
          I'm a 
        </Text>
        <View style={styles.studentTeacherContainer}>
          <TouchableOpacity onPress={() => this.studentPressed()}>
            {this.state.student == true? 
            <Text style={styles.studentButton}>
              Student
            </Text> 
            : 
            <Text style={styles.studentButtonDisabled}>
              Student
            </Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.teacherPressed()}>
            {this.state.student == true? 
            <Text style={styles.teacherButtonDisabled}>
              Teacher
            </Text> 
            : 
            <Text style={styles.teacherButton}>
              Teacher
            </Text>}
          </TouchableOpacity>
        </View>
        {/* this is where the prompts go */}
        <View style={styles.promptsContainer}>
          <View style={styles.userInfoInput}>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.name}
              placeholder='name'
              onChangeText={(name) => this.setState({name: name})}
            />
            </View>
          <View style={styles.userInfoInput}>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.email}
              placeholder='email'
              onChangeText={(email) => this.setState({email: email})}
              keyboardType='email-address'
            />
          </View>
          <View style={styles.userInfoInput}>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.password}
              placeholder='password'
              onChangeText={(password) => this.setState({password: password})}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.userInfoInput}>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.confirmPassword}
              placeholder='confirm password'
              onChangeText={confirmPassword => this.setState({confirmPassword})}
              secureTextEntry = {true}
            />
          </View>
          <TouchableOpacity onPress={() => this.onDonePressed()}>
            <View style={styles.doneButton}>
              <Text style={styles.buttonText}> 
                Done 
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </ImageBackground>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#274156',
    alignItems: 'center',
    flex: 1,
  },
  background:{
    height: deviceHeight,
    width: deviceWidth,
    alignItems: 'center',
  },
  startText: {
    fontSize: 30,
    fontFamily: 'HelveticaNeue-Medium',
    color: 'white',
    paddingTop: 80,
  },
  studentTeacherContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  studentButton: {
    fontSize: 40,
    paddingRight: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
  },
  studentButtonDisabled:{
    fontSize: 40,
    paddingRight: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Medium',
  },
  teacherButton: {
    fontSize: 40,
    paddingLeft: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
  },
  teacherButtonDisabled: {
    fontSize: 40,
    paddingLeft: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Medium',
  },
  promptsContainer: {
    alignItems: 'center'
  },
  textInputStyle: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'HelveticaNeue-Medium',
    margin: 10,
  },
  userInfoInput: {
    height: deviceHeight*.08,
    width: deviceWidth*.9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  doneButton: {
    height: deviceHeight*.09,
    width: deviceHeight*.11,
    backgroundColor: '#2c2828',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
//this lets the component get imported other places
export default Signup;

//https://reactnativecode.com/react-native-insert-text-input-data-to-mysql-server/
