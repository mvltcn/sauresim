import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import Home from "../screens/Home";
import Likes from "../screens/Likes";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

// Tab şeklinde yani yana doğru gelen sayfalar
// Keşfet, Beğeniler, Yüklenenler sayfalarını kontrol eden navigator
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => { // eğer o tabdaysak o tabın logosunu mavi logo yapıyoruz
          let routeName = route.name.toLowerCase(); // o tabın logosunu bulabilmeyi kolaylaştırmak için tabın adını ufak harflere çeviriyoruz
          let icon;

          switch (routeName) { // tabın adına ve fokuslu olup olmamasına göre logosunu buluyoruz
            case "home": {
              icon = focused
                ? require("../../assets/images/icon_home_focused.png")
                : require("../../assets/images/icon_home.png");
              break;
            }
            case "likes": {
              icon = focused
                ? require("../../assets/images/icon_likes_focused.png")
                : require("../../assets/images/icon_likes.png");
              break;
            }
            case "profile": {
              icon = focused
                ? require("../../assets/images/icon_profile_focused.png")
                : require("../../assets/images/icon_profile.png");
              break;
            }
          }

          return <Image source={icon} style={{ width: 36, height: 36 }} />;
        },
      })}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
