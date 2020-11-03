import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase";

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
