import React from "react";
import {
  StyleSheet,
  Text,
  CheckBox,
  Button,
  View,
  KeyboardAvoidingView,
  ScrollView,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  TouchableOpacity,
  TimePickerAndroid,
  ToastAndroid,
  Image
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LunchorDinner: "Lunch",
      image: null,
      limitedorunlimited: "Limited1",
      touch: "Click Here For Select Photo"
    };
  }

  render() {
    let { image } = this.state;
    let { touch } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <Text style={styles.heding}> FoodHUNT </Text>
        <ScrollView>
          <RadioButton.Group
            onValueChange={LunchorDinner => this.setState({ LunchorDinner })}
            value={this.state.LunchorDinner}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "center"
              }}
            >
              <RadioButton value="Lunch" />
              <Text style={styles.LunchorDinner}>Lunch</Text>
              <Text style={styles.lunch}></Text>
              <RadioButton value="Dinner" />
              <Text style={styles.LunchorDinner}>Dinner</Text>
            </View>
          </RadioButton.Group>

          <RadioButton.Group
            onValueChange={limitedorunlimited =>
              this.setState({ limitedorunlimited })
            }
            value={this.state.limitedorunlimited}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "center"
              }}
            >
              <RadioButton value="Limited1" />
              <Text style={styles.LunchorDinner}>Limited1</Text>
              <Text style={styles.LunchorDinner}></Text>
              <RadioButton value="Limited2" />
              <Text style={styles.LunchorDinner}>Limited2</Text>
              <RadioButton value="Unlimited" />
              <Text style={styles.LunchorDinner}>Unlimited</Text>
            </View>
          </RadioButton.Group>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity onPress={this._pickImage}>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 15,
                  marginBottom: 15,
                  color: "#0C07F7"
                }}
              >
                {touch}
              </Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [7, 9]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  heding: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: 0,
    fontSize: 25,
    paddingTop: 28,
    paddingBottom: 8
  },
  LunchorDinner: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 4
  },
  lunch: {
    marginLeft: 20
  }
});
