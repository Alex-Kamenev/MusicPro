import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableHighlight, Dimensions, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {

    // Initially, Welcome page is displayed
    state = {
        welcomePageDisplay: 'flex',
        calendarPageDisplay: 'none',
        schedulePageDisplay: 'none',
    }

    // When Welcome Page button is pressed, hide  and Shedule pages and show Welcome page
    handleWelcomePagePress = () => this.setState(state => ({
        welcomePageDisplay: 'flex',
        calendarPageDisplay: 'none',
        schedulePageDisplay: 'none',
    }));
    
    // When Shedule Page button is pressed, hide Welcome and Calendar pages and show Schedule page
    handleCalendarPagePress = () => this.setState(state => ({
        welcomePageDisplay: 'none',
        calendarPageDisplay: 'flex',
        schedulePageDisplay: 'none',
    }));
    
    // When Calendar Page button is pressed, hide Welcome and Shedule pages and show Calendar page
    handleSchedulePagePress = () => this.setState(state => ({
        welcomePageDisplay: 'none',
        calendarPageDisplay: 'none',
        schedulePageDisplay: 'flex',
    }));
    
    render() {
        return (
            <View style={styles.container}>
                
                {/*Welcome page screen layout here*/}
                <View style={{ display: this.state.welcomePageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentTop}>
                        <Text style={styles.year}>
                            2019
                        </Text>
                        <Text style={styles.date}>
                            Thu, Oct 13
                        </Text>
                        </View>
                        <View style={styles.contentMid}>
                        <Text style={styles.title}>
                            No appointments today :/
                        </Text>

                        </View>
                    </View>
                </View>
                
                {/*Calendar page screen layout here*/}
                <View style={{ display: this.state.calendarPageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentTop}>
                        <Text style={styles.year}>
                            2019
                        </Text>
                        <Text style={styles.date}>
                            Thu, Oct 13
                        </Text>
                        </View>
                        <View style={[styles.contentMid, styles.mine]}>
                            <Image
                    source={{ uri: 'https://cdn1.imggmi.com/uploads/2019/10/23/df06404467789d4724081642dd2570ee-full.png' }}
                    style={{ flex: 1 }}
                    resizeMode='stretch'
                />
                        </View>
                    </View>
                </View>
                
                {/*Schedule page screen layout here*/}
                <View style={{ display: this.state.schedulePageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentTop}>
                        <Text style={styles.year}>
                            2019
                        </Text>
                        <Text style={styles.date}>
                            Thu, Oct 13
                        </Text>
                        </View>
                        <View style={styles.contentMid}>
                        </View>
                    </View>
                </View>
                
                {/*Bottom nav bar shows on each screen*/}
                <View style={styles.navbarContainer}>
                    <TouchableHighlight underlayColor='darkgray' style={[styles.navButton, styles.left]}
                    onPress={this.handleWelcomePagePress}
                    >
                        <Text style={styles.navButtonText}>
                            Home
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='darkgray' style={styles.navButton}
                    onPress={this.handleCalendarPagePress}
                    >
                        <Text style={styles.navButtonText}>
                            Calendar
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='darkgray' style={[styles.navButton, styles.right]}
                    onPress={this.handleSchedulePagePress}
                    >
                        <Text style={styles.navButtonText}>
                            Schedule
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
      );
   }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
    },
    contentContainer: {
        height: 8*(deviceHeight/9),
        width: deviceWidth,
        backgroundColor: '#37adcb',
    },
    contentTop: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#37adcb',
    },
    contentMid: {
        flex: 6,
        justifyContent: 'center',
        width: deviceWidth,
        backgroundColor: 'white',
    },
    title: {
        fontSize: deviceHeight/15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#37adcb',
    },
    year: {
        fontSize: deviceHeight/30,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#DDDDDD',
        marginLeft: 4,
    },
    date: {
        fontSize: deviceHeight/15,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 4,
    },
    paragraph: {
        fontSize: deviceHeight/20,
        textAlign: 'center',
        color: 'white',
    },
    navbarContainer: {
        height: deviceHeight/9,
        width: deviceWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        height: deviceHeight/9,
        width: deviceWidth/3,
        backgroundColor: '#37adcb',
        borderColor: 'darkgray',
        borderWidth: 1,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    left: {
        borderLeftWidth: 2,
    },
    right: {
        borderRightWidth: 2,
    },
    navButtonText: {
        fontSize: deviceHeight/30,
        textAlign: 'center',
        color: 'white',
    },
    mine: {
    },

});