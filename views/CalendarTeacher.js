//Calendar screen linked to TeacherDash
//This the calendar of the teacher
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
  TouchableHighlight,
} from "react-native";
import { Constants } from "expo";
import { Actions } from "react-native-router-flux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';



let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

class CalendarTeacher extends React.Component {
  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount() {}

  state = {
    date: "",
    inputValue: "",
    teacherDashDisplay: "block",
    teacherProfileScrollDisplay: "none",

    lessonsList: [
      {
        name: "Request",
        time: "S Jacobs at 11 - 12 PM"
      },
      {
        name: "Request",
        time: "D Brown at 13 - 14 PM"
      },
      {
        name: "Request",
        time: "S Smith at 16 - 17 PM"
      }
    ]
  };

  
  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    this.setState({
      //Setting the value of the date time
      date: "Today is: " + month + "/" + date + "/" + year
    });
  };

  handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  handleCalendarPress = () => {
    //Actions.CalendarTeacher({userData: this.props.userData});
  };

  handleProfilePress = () => {
    Actions.StudentList({userData: this.props.userData});
  };
  handleTeacherDash = () => {
    Actions.TeacherDash({userData: this.props.userData});
  };

  render() {
    return (
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      {/* this is just random filler for the template, but this is where what the user sees is rendered */}
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
        <Calendar
          // Specify style for calendar container element. Default = {}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: deviceHeight*0.5

          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#274156",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "#274156",
            monthTextColor: "#274156",
            indicatorColor: "#274156",
            textDayFontFamily: "HelveticaNeue-Medium",
            textMonthFontFamily: "HelveticaNeue-Medium",
            textDayHeaderFontFamily: "HelveticaNeue-Medium",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 18,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 18
          }}
          // Initially visible month. Default = Date()
          current={"2018-12-03"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2018-01-01"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2020-12-31"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={() => {
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MMM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
        />
        <ScrollView>
          {this.state.lessonsList.map(student => (
            <View key={student.time} style={styles.listContainer}>
              <TouchableHighlight
                onPress={() => {
                //needs a proper box with a more sophisticated message and a accept reject buttons
                  alert("Yes/No to request?");
                }}
              >
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{student.name}</Text>
                  <Text style={styles.infoText}>{student.time}</Text>
                </View>
              </TouchableHighlight>
            </View>
          ))}
        </ScrollView>
      </View>
     </KeyboardAwareScrollView>
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
    paddingLeft:40,
    width: deviceWidth / 2.5,
    alignItems: "center",
    flexDirection: "row"
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
export default CalendarTeacher;
