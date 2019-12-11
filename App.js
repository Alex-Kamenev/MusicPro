import React from 'react';
//this imports the basic components used to make views for the user, since this is just routing screens and isn't seen by the user, this isn't actually needed
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
//this is the package that's used for the screen routing
import { Router, Scene} from 'react-native-router-flux';
//this imports the other screen, usually you'll have a list of these for all the screens in teh app
import * as firebase from 'firebase';

import Login from './views/Login';
import RegisteredLogin from './views/RegisteredLogin';
import Signup from './views/Signup';
import TeacherCalendar from './views/TeacherCalendar';
import TeacherDash from './views/TeacherDash';
import StudentList from './views/StudentList';
import TeacherList from './views/TeacherList';
import StudentRequest from './views/StudentRequest';
import StudentDash from './views/StudentDash';
import CalendarTeacher from './views/CalendarTeacher';
import SudentCalendar from './views/SudentCalendar';
import ConfirmationPage from './views/ConfirmationPage';

export default function App() {

  const firebase = require("firebase");
  const firebaseConfig = {
    apiKey: "AIzaSyBibeHWhuTpX-pAob9a8xcY6ucwR-_8iw8",
    authDomain: "musicpro-1a762.firebaseapp.com",
    databaseURL: "https://musicpro-1a762.firebaseio.com",
    storageBucket: "musicpro-1a762.appspot.com",
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  return (
    //this is the screen router, it will move people from screen to screen
    <Router>
      {/* this is the root scene that is never seen by the user */}
      <Scene key='root'>
        <Scene
            key = 'Login'
            component = { Login }
            hideNavBar = { true }
        />
        <Scene
            key = 'RegisteredLogin'
            component = { RegisteredLogin }
            hideNavBar = { true }
        />
        <Scene 
          key = 'Signup'
          component = { Signup }
          hideNavBar = { true }  
        />
        <Scene
          key = "TeacherDash"
          component = { TeacherDash }
          hideNavBar = { true }
          gesturesEnabled = { false }
        />
        <Scene
          key = "StudentDash"
          component = { StudentDash }
          hideNavBar = { true }
          gesturesEnabled = { false }
        />
        <Scene
          key = 'StudentList'
          component = { StudentList }
          hideNavBar = { true }
        />
        <Scene
          key = "TeacherList"
          component = { TeacherList }
          hideNavBar = { true }
        />
        <Scene
          key = "StudentRequest"
          component = { StudentRequest }
          hideNavBar = { false }
        />
        <Scene
          key = 'TeacherCalendar'
          component = { TeacherCalendar }
          hideNavBar = { false }
        />
        <Scene
          key = 'CalendarTeacher'
          component = { CalendarTeacher }
          hideNavBar = { true }
        />
        <Scene
            key = 'SudentCalendar'
            component = { SudentCalendar }
            hideNavBar = { true }
        />
        <Scene
            key = 'ConfirmationPage'
            component = { ConfirmationPage }
            hideNavBar = { true }
        />
      </Scene>
    </Router>
  );
}