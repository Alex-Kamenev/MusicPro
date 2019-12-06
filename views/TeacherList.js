import React, { Component } from 'react';
import { FlatList, AppRegistry, Text, View, StyleSheet, Image, Dimensions, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class TeacherList extends React.Component {

  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount(){

  }

  //
    state = {
        inputValue: '',
        data: [],
    }

    fetchData = async()=>{
        const response = await fetch('http://10.10.130.189:3000/user');
        const users = await response.json();
        this.setState({data: users});
    }

    componentDidMount(){
        this.fetchData();
    }

handleTextChange = inputValue => {
    this.setState({ inputValue });
};

handleCalendarPress = () => {
    Actions.SudentCalendar();
}

handleProfilePress = () => {
}

handleCheckPress = () => {
    Actions.TeacherCalendar();
}



  render() {
    return (
      <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.leftContainer}>
                    <Image 
                        source={{ uri: 'https://www.pace.edu/sites/default/files/styles/news_item_675x450/public/marijoRussel_OGrady_DAILY_0.jpg?itok=viugcOqU' }}
                        style={styles.imageMain}
                    />
                    </View>
                    <View style={styles.middleContainer}>
                        <Text style={styles.nameText}>
                            Sarah Gibney
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                    <TouchableHighlight
                        onPress={this.handleCalendarPress}
                    >
                        <Image 
                         source={{ uri: 'http://fa2png.io/media/icons/font-awesome/4-7-0/calendar-times-o/256/0/274156_none.png' }}
                        style={styles.icon}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.handleProfilePress}
                    >
                        <Image 
                            source={{ uri: 'http://fa2png.io/media/icons/font-awesome/4-7-0/address-card-o/256/0/274156_none.png' }}
                            style={styles.icon}
                        />
                    </TouchableHighlight>  
                    </View>
                </View>
                <View style={styles.searchBar}>
                    <Image 
                        source={{ uri: 'http://fa2png.io/media/icons/font-awesome/4-7-0/search/256/0/274156_none.png' }}
                        style={styles.searchIcon}
                     />
                     <TextInput
                    value={this.state.inputValue}
                    onChangeText={this.handleTextChange}
                    style={styles.searchInput}
                    />
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    
                    renderItem={({item}) => 
                        <View style={styles.listContainer}>   
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{uri: item.image}}
                                >
                                </Image>
                            </View>                             
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameText}>
                                    {item.name}
                                </Text>
                                <Text style={styles.infoText}>
                                    {item.location}
                                </Text>
                                <Text style={styles.infoText}>
                                    {item.instrument}
                                </Text>
                            </View>
                            <View style={styles.checkContainer}>
                                <TouchableHighlight
                                   onPress={this.handleCheckPress}
                                >
                                    <Image 
                                        source={{ uri: 'http://fa2png.io/media/icons/font-awesome/4-7-0/check-square/256/0/274156_none.png' }}
                                        style={styles.icon}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    }
                />
            </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
     },
     topBar: {
         flexDirection: 'row',
         alignItems: 'center',
         height: deviceHeight/5,
         width: deviceWidth,
         backgroundColor: 'white',
         borderBottomWidth: 2,
         borderBottomColor: 'grey',
     },
     leftContainer:{
         width: deviceWidth/4,
         alignItems: 'center',
     },
     middleContainer: {
         width: deviceWidth/2.5,
     },
     rightContainer:{
        width: deviceWidth/2.5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 40,
     },
     searchBar:{
        height: deviceHeight/10,
        flexDirection: 'row',
        alignItems: 'center',
     },
     searchInput: {
        height: deviceHeight/18,
        width: (deviceWidth/5)*4,
        backgroundColor: '#eeeced',
        margin: 10,
        borderRadius: 10,
     },
     listContainer: {
         flexDirection: 'row',
         width: (deviceWidth) - 5,
         height: deviceHeight/8,
         backgroundColor: 'white',
         borderRadius: 15,
         margin: 3,
         borderWidth: 1,
         borderBottomWidth: 2,
         borderColor: 'grey',
     },
     nameContainer: {
         width: (deviceWidth/4)*2,
         flexDirection: 'column',
     },
     imageContainer: {
         width: deviceWidth/4,
         alignItems: 'center',
         justifyContent: 'center'
     },
     checkContainer: {
        width: deviceWidth/4,
        alignItems: 'center',
        justifyContent: 'center'
    },
     nameText: {
         fontSize: 16,
         color: '#2c2828',
         fontFamily: 'HelveticaNeue-Medium',
         marginTop: 5,
     },
     infoText: {
         fontSize: 14,
         color: '#5b5b5b',
         fontFamily: 'HelveticaNeue-Light',
         marginTop: 2,
     },
     image:{
         width: deviceWidth/5,
         height: deviceWidth/5,
         borderRadius: 35,
     },
     imageMain:{
        width: deviceWidth/5,
        height: deviceWidth/5,
        borderRadius: 35    ,
        marginTop: 5,
    },
    icon:{
        width: deviceWidth/12,
        height: deviceWidth/12, 
        margin: 5,
    },
    searchIcon:{
        width: deviceWidth/16,
        height: deviceWidth/16, 
        marginLeft: 20,
        marginRight: 5,
    },
});


//this lets the component get imported other places
export default TeacherList;