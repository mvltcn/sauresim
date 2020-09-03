import auth from "@react-native-firebase/auth";
import React from "react";
import { View } from "react-native";
import colors from "../../assets/styles/colors";
import MyButton from "../MyButton";
import TabTitle from "../TabTitle";

// Ayarlar sayfası
export default function Settings({ navigation }) {
  // ayarlar sayfasında çıkış butonuna tıklandığında çağrılan fonksiyon
  function logOff() {
    // firebaseye çıkış yaptığımızı söylüyoruz
    auth()
      .signOut()
      .then(() => {
        // çıkış başarılı olduğunda giriş sayfasına gidip geçmişi de siliyoruz ki giriş sayfasında geri tuşuna basılarak tekrar ayarlar sayfasına dönülemesin
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      });
  }

  return (
    <View>
      <TabTitle title="Ayarlar" />

      <MyButton
        buttonStyle={{
          width: 312,
          backgroundColor: colors.negative,
          alignSelf: "center",
        }}
        onPress={logOff}
      >
        ÇIKIŞ YAP
      </MyButton>
    </View>
  );
}
