import React from 'react';
import { View, StyleSheet } from 'react-native';

class TeacherCalendarSetup extends React.Component {

  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount(){

  }

  render() {
    return (
      // this is just random filler for the template, but this is where what the user sees is rendered
      <View />
    );
  }
}

const styles = StyleSheet.create({
  
});


//this lets the component get imported other places
export default TeacherCalendarSetup;