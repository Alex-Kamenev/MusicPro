//Teacher Dash screen is the main screen on the teacher side of the app
//has to 3 link buttons but two of them link to the same screen for now
import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableHighlight
} from "react-native";
//Alejandro: only weirdos do this like this ^^^^^
import { Constants } from "expo";
import { Actions } from "react-native-router-flux";
import * as firebase from 'firebase';

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

class TeacherDash extends React.Component {
  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount() {}

  state = {
    date: "",
    inputValue: "",
    teacherDashDisplay: "block",
    teacherProfileScrollDisplay: "none",

    lessonsList: [
      {
        name: "S Jacobs",
        time: "11 - 12 PM"
      },
      {
        name: "V Cookson",
        time: "12 - 1  PM"
      },
      {
        name: "B Jacobs",
        time: "2- 3 PM"
      },
      {
        name: "Grace W",
        time: "3:30 - 4:30 PM"
      },
      {
        name: "Sa Jacobs",
        time: "5 - 6 PM"
      },
      {
        name: "Grace S",
        time: "7 - 7:30 PM"
      },
      {
        name: "D Jacobs",
        time: "8 - 9 PM"
      }
    ]
  };
  
  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    this.setState({
      //Setting the value of the date time
      date:
        "Today is: " + month + "/" + date + "/" + year
    });
  };

  handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  handleCalendarPress = () => {
    Actions.CalendarTeacher();
  };

  handleProfilePress = () => {
    Actions.StudentList();
  };

  handleTeacherDash = () => {
    Actions.TeacherDash();
  };

  render() {
    return (
      // this is just random filler for the template, but this is where what the user sees is rendered
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.leftContainer}>
            <TouchableHighlight onPress={this.handleTeacherDash}>
              <Image
                source={{
                  uri:
                    "https://www.pace.edu/sites/default/files/styles/news_item_675x450/public/marijoRussel_OGrady_DAILY_0.jpg?itok=viugcOqU"
                }}
                style={styles.imageMain}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.profileText}>{JSON.stringify(this.props.userData['name']).replace(/['"]+/g, '')}</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableHighlight onPress={this.handleCalendarPress}>
              <Image
                source={{
                  uri:
                    "http://fa2png.io/media/icons/font-awesome/4-7-0/calendar-times-o/256/0/274156_none.png"
                }}
                style={styles.icon}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handleProfilePress}>
              <Image
                source={{
                  uri:
                    "http://fa2png.io/media/icons/font-awesome/4-7-0/address-card-o/256/0/274156_none.png"
                }}
                style={styles.icon}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.dateBar}>
          <Text style={styles.dateText}>{this.state.date}</Text>
        </View>
        <ScrollView>
          {this.state.lessonsList.map(student => (
            <View key={student.name} style={styles.listContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{student.name}</Text>
                <Text style={styles.infoText}>{student.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    height: deviceHeight / 6,
    width: deviceWidth,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "grey"
  },
  leftContainer: {
    width: deviceWidth / 4,
    alignItems: "center"
  },
  middleContainer: {
    width: deviceWidth / 2.5
  },
  rightContainer: {
    width: deviceWidth / 2.5,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 40
  },
  dateBar: {
    height: deviceHeight / 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderColor: "#eeeced"
  },
  dateText: {
    fontSize: 18,
    color: "#838081",
    fontFamily: "HelveticaNeue-Medium",
    marginTop: 5
  },
  listContainer: {
    flexDirection: "row",
    width: deviceWidth - 5,
    height: deviceHeight / 8,
    backgroundColor: "#274156",
    borderRadius: 15,
    margin: 3,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: "grey"
  },
  nameContainer: {
    width: (deviceWidth / 4) * 4,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 5
  },
  nameText: {
    fontSize: 18,
    color: "white",
    fontFamily: "HelveticaNeue-Medium",
    marginTop: 5
  },
  profileText: {
    fontSize: 18,
    color: "#2c2828",
    fontFamily: "HelveticaNeue-Medium",
    marginTop: 5
  },
  infoText: {
    fontSize: 16,
    color: "white",
    fontFamily: "HelveticaNeue-Light",
    marginTop: 2
  },
  imageMain: {
    width: deviceWidth / 5,
    height: deviceWidth / 5,
    borderRadius: 35,
    marginTop: 5
  },
  icon: {
    width: deviceWidth / 12,
    height: deviceWidth / 12,
    margin: 5
  }
});

//this lets the component get imported other places
export default TeacherDash;
