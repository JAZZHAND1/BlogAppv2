import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Button, Header, Image } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign } from '@expo/vector-icons';
import { removeData } from "../functions/AsyncStorageFunctions";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
import HeaderHome from "../components/HeaderHome";
import * as firebase from "firebase";
import "firebase/firestore";

const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Card>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/profile.PNG")}
                style={styles.imageStyle}
              />
              <Text style={{ fontSize: 32 }}>
                {auth.CurrentUser.name}
              </Text>
            </View>
          </Card>
          <TouchableOpacity
            style={{ height: 8, width: 150, alignSelf: "center", margin: 10, marginBottom: 28 }}
          >
            <Button
              type="solid"
              title=" Delete Profile"
              icon={<AntDesign name="deleteuser" size={12} color="white" />}
              onPress={async () => {
              //  console.log(auth.CurrentUser.id);
                alert(JSON.stringify(auth.CurrentUser.uid));
                firebase.auth().currentUser.delete()
                const db =  firebase.firestore()
                const cityRef = db.collection('users').doc(auth.CurrentUser.uid).delete();
                removeData(auth.CurrentUser.id);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />
          </TouchableOpacity>
          <Card>
            <View>
              <Text style={{ alignSelf: "center", fontSize: 18 }}>
                Born on: January, 2000 {"\n"}
                  Address: CP,Bangladesh {"\n"}
                  Studying at IUT {"\n"}
              </Text>
            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    height: 260,
    width: 260,
    alignSelf: 'center',
  },
});

export default ProfileScreen;