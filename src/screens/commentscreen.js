import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";


const commentscreen = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [like,setlike] =useState(0);
    const [user,setuser] =useState([]);
    const [comment,setcomment] =  useState("");
    const [commenter,setcommenter] =useState();
    const [allcomments,setallcomments] =useState([]);

    const loadPosts = async () => {
   
    };
  

   {console.log(props);}
      useEffect(() => {
        loadPosts();
      // loadcomments();
      }, []);
 

      return (
        <AuthContext.Consumer>
          {(auth) => (
            <View style={styles.viewStyle}>
              <HeaderHome
                DrawerFunction={() => {
                  props.navigation.toggleDrawer();
                }}
              />
             {        
                
               
             }
             <PostCard 
                 author={auth.postername}
                 title={auth.postname}
                 body={auth.postbody}
                 like={auth.like}
                 id ={auth.clickedpost}
                 f ={props.navigation} 
                   
             />
           <Card>
            <Input
              placeholder="Comment what you think?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={(currentText) => {
                setcomment(currentText);
              }}
            />
            <Button
              title="Comment"
              type="outline"
              onPress={function (){
                let allcomments =[];
                let temp =[];
                firebase
                .firestore()
                .collection("posts").doc(auth.clickedpost).get().then((doc)=>{
                 temp= doc.data().comments;
                 temp.forEach(element => {
                   console.log(element);
                   allcomments.push(element);
                 });
                 let object={comment:comment,commenter:auth.CurrentUser.displayName};
                 allcomments.push(object);
                // console.log(allcomments);
                 setallcomments(allcomments);
                 firebase.firestore().collection("posts").doc(auth.clickedpost).update({comments:allcomments});
                 
                })


              //  setcommenter();
               // console.log(auth.CurrentUser.displayName);
              //  console.log(auth.clickedpost);
                
               // console.log(JSON.stringify(object));
               // 

              }
            }
            />    
         </Card>
        { console.log(allcomments)}

              <ActivityIndicator size="large" color="red" animating={loading} />
              <FlatList
                data={allcomments}
                renderItem={({ item }) => {
                  return (
                    <PostCard
                      author={item.commenter}
                    //  title={item.id}
                      body={item.comment}
                      like={0}
                    //  id ={item.id}
                    
                    />
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
export default commentscreen;