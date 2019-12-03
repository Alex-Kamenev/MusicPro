import React from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, Dimensions, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

class TeacherCalendar extends React.Component {

  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount(){

  }

  handlePress = () => {
    Actions.StudentRequest();
  }


  render() {
    return (
      <View style={styles.container}>
        <CalendarList
          // Specify style for calendar container element. Default = {}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: deviceHeight
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
            textDayFontSize: 20,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 20
          }}
          // Initially visible month. Default = Date()
          current={"2019-12-03"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2019-12-03"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2020-03-03"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={() => {
            Actions.StudentRequest();
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
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          //missing func since not used
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
});


//this lets the component get imported other places
export default TeacherCalendar;