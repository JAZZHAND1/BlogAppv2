import React, { useState,useEffect } from "react";
import { View, StyleSheet,FlatList,} from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";
const NotificationScreen = (props) => {
  const[notify,setnotify] =useState({});
  let render =[];
  const loadall = async () => {
    firebase
    .firestore()
    .collection("posts")
    .onSnapshot((querySnapshot) => {
      let temp_posts = [];
      querySnapshot.forEach((doc) => {
        temp_posts.push({
         data: doc.data(),
        });
      });
      setnotify(temp_posts);
     // setLoading(false);
     // alert(posts);
      
    })
}

useEffect(() => {
  loadall();
}, []);

console.log(notify);




  let notification =[];
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "thumbs-o-up",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                
                Pam Beesley Liked Your Post.
              </Text>
              


            </View>
          </Card>
          <FlatList
            data={notify}
            renderItem={({ item }) => {
              return (
               <Text>
                  {item.data.likers} has liked your post
               </Text>

              );
            }}
          />
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
});

export default NotificationScreen;
