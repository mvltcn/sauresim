import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import StackNavigator from "./src/navigators/StackNavigator";
import { getUser } from "./src/Database";

export default function App() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  // kullanıcı giriş çıkış yaptığında
  function onAuthStateChanged(user) {
    setUser(user);
    if (user != null) {
      console.log(
        auth().currentUser.displayName + " isimli kullanici giris yapti."
      );
      getUser(auth().currentUser.uid)
        .update({
          displayName: auth().currentUser.displayName,
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Kullanici giris yapmadi. (Kullanici==null)");
    }
    if (initializing) setInitializing(false);
  }

  // mount edildiğinde = ilk defa oluşturulduğunda
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
