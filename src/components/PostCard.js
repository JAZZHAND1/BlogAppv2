import React,{useState} from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext } from "../providers/AuthProvider";


const PostCard = (props) => {
  const [like,setlike] = useState();
  return (
    <AuthContext.Consumer>
    {(auth) => (
    
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      {setlike(props.like)}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          onPress = {function (){
              setlike(like+1);
             const db = firebase.firestore()
             db.collection("posts").doc(props.id).update({likes:like+1}).then(()=>{
            
            }
            ).catch((error) =>{

            });
              
          }}
          title={"Like("+like+")"}
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
        />
        <Button type="solid" title="Comment" onPress ={function(){
        //  console.log(props.id);
           auth.setclickedpost(props.id);
           auth.setpostbody(props.body);
           auth.setpostname(props.title)
           auth.setpostername(props.author);
           auth.setlike(props.like);
         props.f.navigate("commentscreen");
        }} />
      </View>
    </Card>
     )}
  </AuthContext.Consumer>
  );
};

export default PostCard;
