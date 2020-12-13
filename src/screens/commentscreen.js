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
    
    const loadPosts = async () => {
    
        setLoading(true);
        firebase
          .firestore()
          .collection("posts")
          .onSnapshot((querySnapshot) => {
            let temp_posts = [];
            querySnapshot.forEach((doc) => {
              if(doc.id===props.id){
                temp_posts.push({
                id: doc.id,
                data: doc.data(),
                });
              }
                
            });
            setPosts(temp_posts);
            setLoading(false);
            alert(posts);
            
          })
          .catch((error) => {
            setLoading(false);
            alert(error);
          });
      };
      useEffect(() => {
        loadPosts();
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
             {console.log(auth)
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
              
              </Card>
              <ActivityIndicator size="large" color="red" animating={loading} />
              <FlatList
                data={posts}
                renderItem={({ item }) => {
                  return (
                    <PostCard
                      author={item.data.author}
                      title={item.id}
                      body={item.data.body}
                      like={item.data.likes}
                      id ={item.id}
                    
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