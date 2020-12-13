import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabScreen from "./../navigation/HomeTab";
import ProfileScreen from "./../screens/ProfileScreen";
import commentscreen from "./../screens/commentscreen";
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
      <AppDrawer.Screen name="commentscreen" component={commentscreen} />

    </AppDrawer.Navigator>
  );
};

export default AppDrawerScreen;
