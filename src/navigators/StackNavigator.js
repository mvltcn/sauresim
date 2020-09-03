import auth from "@react-native-firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabNavigator from "../navigators/TabNavigator";
import ImageDetails from "../screens/ImageDetails";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

// Stack şeklinde yani üst üste gelen sayfaları kontrol eden fonksiyon sınıf
export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={auth().currentUser != null ? "Home" : "Login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="ImageDetails" component={ImageDetails} />
      <Stack.Screen name="AvatarNamePostsLikes" component={Profile} />
    </Stack.Navigator>
  );
}
