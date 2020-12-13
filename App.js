import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import commentscreen from "./src/screens/commentscreen";
import PostCard from "./src/components/PostCard";
import {postprovider,PostContext} from "./src/providers/PostProvider";
const PostStack =createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyC3_uJUDFSQ6gWovjLjxbgRcd2LXUJPBQk",
  authDomain: "blogapplication-57487.firebaseapp.com",
  databaseURL: "https://blogapplication-57487.firebaseio.com",
  projectId: "blogapplication-57487",
  storageBucket: "blogapplication-57487.appspot.com",
  messagingSenderId: "598621028232",
  appId: "1:598621028232:web:a7194ef4b790fd48bd043d"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const PostStackScreen = () => {
  return (
    <PostStack.Navigator initialRouteName="HomeScreen">
      <PostStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="commentscreen"
        component={commentscreen}
        options={{ headerShown: false }}
      />
       <PostStack.Screen
        name="postcard"
        component={PostCard}
        options={{ headerShown: false }}
      />
    </PostStack.Navigator>
  );
};


function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
