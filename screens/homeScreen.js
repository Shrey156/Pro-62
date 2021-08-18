import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allAttendance: [],
      presentPress: [],
      absentpress: [],
      submitable: true,
      missingData: 0,
    };
  }
  componentDidMount = async () => {
    var classref = await db.ref('/').on('value', (data) => {
      var allAttendance = [];
      var a_1 = data.val();

      for (var i in a_1) {
        allAttendance.push(a_1[i]);
      }

      allAttendance.sort(function (a, b) {
        return a.rollNo - b.rollNo;   
      });

      this.setState({ allAttendance: allAttendance });
      console.log(allAttendance);
    });
  };

  // submitAttendance = () => {
  //   this.props.navigation.navigate('SummaryScreen');

  //   var today = new Date();
  //   var year = today.getFullYear();
  //   var month = today.getMonth() + 1;
  //   var date = today.getDate();
  // };

  submitForm() {
    var totalSubmitted =
      this.state.presentPress.length + this.state.absentpress.length;
    var expectedSubmissions = this.state.allAttendance.length;

    if (totalSubmitted === expectedSubmissions) {
      this.props.navigation.navigate('SummaryScreen', {
        absentStudents: this.state.absentpress.length,
        presentStudents: this.state.presentPress.length,
        totalPercent: this.state.presentPress.length / expectedSubmissions,
      });
    } else {
      this.setState({
        allAttendance: this.state.allAttendance,
        presentStudents: this.state.presentPress,
        absentStudents: this.state.absentpress,
        submitable: false,
        missingData: expectedSubmissions - totalSubmitted,
      });
    }
  }

  updateAttendance(roll_no, status) {
    console.log('rollno' + roll_no);
    console.log('status' + status);

    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
    console.log('class_ref');
    console.log(class_ref);

    var pS = this.state.presentPress;
    var aS = this.state.absentpress;

    if (status === 'present') {
      if (aS.includes(roll_no)) {
        var targetLocation = aS.indexOf(roll_no);
        aS.splice(targetLocation, 1);
        pS.push(roll_no);
      } else if (pS.includes(roll_no) === false) {
        pS.push(roll_no);
      }
    }
    if (status === 'absent') {
      if (pS.includes(roll_no)) {
        var targetLocation = pS.indexOf(roll_no);
        pS.splice(targetLocation, 1);
        aS.push(roll_no);
      } else if (aS.includes(roll_no) === false) {
        aS.push(roll_no);
      }
    }
    console.log('present');
    console.log(pS);
    console.log('absent');
    console.log(aS);
    this.setState({
      allAttendance: this.state.allAttendance,
      presentPress: pS,
      absentpress: aS,
    });
  }

  render() {
    var allS = this.state.allAttendance;
    if (allS.length === 0) {
      return (
        <View style={{ alignSelf: 'center', marginTop: 40 }}>
          <Text style={{ fontSize: 30 }}>No Student Found</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
            {this.state.allAttendance.map((student, index) => (
              <View style={{ flexDirection: 'row' }}>
                <Text>
                  {this.state.allAttendance[index]['rollNo']}

                  {this.state.allAttendance[index]['name']}
                </Text>
                {this.state.presentPress.includes(
                  this.state.allAttendance[index]['rollNo']
                ) ? (
                  //if present

                  <TouchableOpacity
                    onPress={() => {
                      this.updateAttendance(
                        this.state.allAttendance[index]['rollNo'],
                        'present'
                      );
                    }}
                    style={[
                      styles.presentButtonStyle,
                      { backgroundColor: 'green' },
                    ]}>
                    <Text> present </Text>
                  </TouchableOpacity>
                ) : (
                  //if not pressed
                  <TouchableOpacity
                    onPress={() => {
                      this.updateAttendance(
                        this.state.allAttendance[index]['rollNo'],
                        'present'
                      );
                    }}
                    style={[styles.presentButtonStyle]}>
                    <Text>present</Text>
                  </TouchableOpacity>
                )}

                {this.state.absentpress.includes(
                  this.state.allAttendance[index]['rollNo']
                ) ? (
                  //absent code
                  //if absent

                  <TouchableOpacity
                    onPress={() => {
                      this.updateAttendance(
                        this.state.allAttendance[index]['rollNo'],
                        'present'
                      );
                    }}
                    style={[
                      styles.absentButtonStyle,
                      { backgroundColor: 'red' },
                    ]}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                ) : (
                  //if not pressed
                  <TouchableOpacity
                    onPress={() => {
                      this.updateAttendance(
                        this.state.allAttendance[index]['rollNo'],
                        'absent'
                      );
                    }}
                    style={[styles.absentButtonStyle]}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {this.state.submitable === false && (
              <Text style={styles.error}>
                ERROR!{'\n'}You Have Not Submitted Data For{' '}
                {this.state.missingData}
                Students!
              </Text>
            )}
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity
                style={styles.submit_button}
                onPress={() => {
                  this.submitForm();
                }}>
                <Text style={{ color: 'white',backgroundColor:"blue",textAlign:'center',fontSize:30 }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
  error: {
    color: '#a30000',
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
  },

  presentButtonStyle: {
    borderWidth: 3,
    backgroundColor: 'grey',
     marginTop:5,
    marginLeft:30,
  },
  absentButtonStyle: {
    marginTop:5,
    marginLeft:30,
    borderWidth: 3,
    backgroundColor: 'grey',
  },
});
