import React from "react";
import {View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, ImageBackground} from "react-native";
import { Actions } from "react-native-router-flux";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

class RegisteredLogin extends React.Component {
  //I always like keeping this here, it is for performing actions before the component (the screen) loads
  componentWillMount() {}

  state = {
    username: '',
    password: '',
    student: true,
    data: [],
  };

  backPressed = () => {
    Actions.Login();
  };

  enterTeacherDash = () => {
    Actions.TeacherDash();
  };

  enterStudentDash = () => {
      Actions.StudentDash();
  };

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

  confirm =()=> {
    const {password} = this.state;
    const {username} = this.state;

    fetch('http://10.10.130.189/verify.php', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
      if(responseJson == 'Welcome'){
        Alert.alert(responseJson);
        {this.state.student
        ?
        Actions.StudentDash()
        :
        Actions.TeacherDash()
        }
      }else{
        alert(responseJson)
      }
    }).catch((error)=>{
      console.error("OMG: " + error);
    });
  }

  render() {
    return (
      // this is just random filler for the template, but this is where what the user sees is rendered
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={{ uri: "https://wallpaperbro.com/img/53490.jpg" }}
        >
          <Text style={styles.title}>MusicPro</Text>
            <View style={styles.isTeacherContainer}>
            
              <TouchableOpacity
                onPress={() => {
                  this.studentPressed();
                }}
                style={styles.selectors}
                activeOpacity={0.7}
              >
              {this.state.student
              ?<Text style={styles.teacherSelectorText}>Student</Text>
              :<Text style={styles.teacherSelectorTextNo}>Student</Text>
              }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.teacherPressed();
                }}
                style={styles.selectors}
                activeOpacity={0.7}
              >
              {this.state.student
              ?<Text style={styles.studentSelectorTextNo}>Teacher</Text>
              :<Text style={styles.studentSelectorText}>Teacher</Text>
              }
              </TouchableOpacity>
            </View>

            <View style={styles.userInfoInput}>
              <TextInput
                style={styles.textInputStyle}
                value={this.state.username}
                placeholder="username"
                onChangeText={username => this.setState({ username: username })}
              />
            </View>

            <View style={styles.userInfoInput}>
              <TextInput
                style={styles.textInputStyle}
                value={this.state.password}
                placeholder="password"
                onChangeText={password => this.setState({ password: password })}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.buttonContainer}>
              
              <TouchableOpacity
                onPress={() => {
                  this.backPressed();
                }}
                style={styles.button}
                activeOpacity={0.6}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  {
                    /*this.state.student
                      ? this.enterStudentDash()
                      : this.enterTeacherDash()*/
                      this.confirm();
                  }
                }}
                style={styles.button}
                activeOpacity={0.6}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

            </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innercontainer: {
    marginTop: "20%",
    alignItems: "center",
  },
  background: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: "center"
  },
  title: {
    fontSize: 70,
    paddingTop: "20%",
    color: "white"
  },
  textInputStyle: {
    fontSize: 24,
    color: "#2c2828",
    fontFamily: "HelveticaNeue-Medium",
    margin: 5
  },
  userInfoInput: {
    height: deviceHeight * 0.08,
    width: deviceWidth * 0.9,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: "90%",
    width: "70%",
    alignItems: "flex-start"
  },
  isTeacherContainer: {
    marginTop: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    height: "20%",
    width: deviceWidth * 0.9
  },
  selectors: {
    height: "30%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  studentSelectorText: {
    fontFamily: "HelveticaNeue-Medium",
    color: "white",
    fontSize: 20
  },
  studentSelectorTextNo: {
    fontFamily: "HelveticaNeue-Medium",
    color: "gray",
    fontSize: 20
  },
  teacherSelectorText: {
    fontFamily: "HelveticaNeue-Medium",
    color: "white",
    fontSize: 20
  },
  teacherSelectorTextNo: {
    fontFamily: "HelveticaNeue-Medium",
    color: "gray",
    fontSize: 20
  },
  button: {
    height: deviceHeight * 0.08,
    width: "40%",
    backgroundColor: "white",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10
  },
  buttonText: {
    fontFamily: "HelveticaNeue-Medium",
    color: "#2c2828"
  }
});

//this lets the component get imported other places
export default RegisteredLogin;