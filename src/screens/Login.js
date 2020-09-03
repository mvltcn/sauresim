import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../assets/styles/colors";
import style from "../../assets/styles/style";
import Error from "../popups/Error";
import MyButton from "../MyButton";
import Loading from "../Loading";

// Giriş sayfası
export default function Login({ navigation, screenName }) {
  let passwordInput;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorScreenVisible, setErrorScreenVisible] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");
  const [isLoggingIn, setLoggingIn] = useState(false);

  // hata ekranı gösteren fonksiyon
  function showErrorScreen(message) {
    console.log("Giris yaparken hata: " + message);
    setErrorMesage(message); // hata mesajı
    setErrorScreenVisible(true); // hata ekranı görünürlüğü = true
    setLoggingIn(false); // şuanda giriş mi yapılıyor = false
  }

  // giriş butonuna tıklandığında çağrılan fonksiyon
  function logIn() {
    setLoggingIn(true); // şuanda giriş mi yapılıyor = true
    console.log("Giris yapilmaya calisiliyor...");
    if (email.length == 0 || pass.length == 0) { // eğer kullanıcının girdiği bilgiler boşsa
      showErrorScreen("E-posta ya da şifre boş olamaz!");
      return;
    }

    // firebaseye giriş yapmak istediğimizi söylüyoruz
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log(email + " emailine sahip kullanici giris yapti!");
        // başarılı bir şekilde giriş yaptıysak ana sayfaya gidiyoruz
        // navigation.reset diyerek ana sayfadan giriş sayfasına geri dönüşü engelliyoruz (geçmişi silmek)
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => {
        showErrorScreen("E-posta ya da şifre hatalı!");
      });
  }

  // giriş ekranında kayıt ol butonuna tıklnanınca çağrılan fonksiyon
  function register() {
    // kayıt ol sayfasına git
    navigation.navigate("Register");
  }

  if (isLoggingIn) return <Loading>Giriş yapılıyor...</Loading>;

  return (
    <View style={style.container}>
      <Error
        visible={errorScreenVisible}
        onClose={() => {
          setErrorScreenVisible(false);
        }}
      >
        {errorMesage}
      </Error>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 104, height: 120 }}
      />
      <TextInput
        autoCompleteType="email"
        style={{ ...style.textinput, marginTop: 32 }}
        placeholder="E-posta"
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholderTextColor={colors.primary}
        onSubmitEditing={() => {
          passwordInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          passwordInput = input;
        }}
        autoCompleteType="password"
        secureTextEntry={true}
        style={style.textinput}
        onChangeText={(text) => {
          setPass(text);
        }}
        placeholder="Şifre"
        placeholderTextColor={colors.primary}
        onSubmitEditing={() => {
          logIn();
        }}
      />
      <MyButton
        onPress={logIn}
        buttonStyle={{ backgroundColor: colors.important }}
      >
        Giriş
      </MyButton>
      <Text
        style={{
          marginTop: 14,
          fontSize: 17,
          color: colors.primary,
          textDecorationLine: "underline",
        }}
      >
        Şifremi Unuttum
      </Text>
      <View style={{ position: "absolute", bottom: 32, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
            }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              color: colors.primary,
              textAlign: "center",
            }}
          >
            ya da
          </Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
            }}
          />
        </View>
        <TouchableOpacity
          title="Kayıt Ol"
          style={{ ...style.button, backgroundColor: colors.important }}
          activeOpacity={1}
          onPress={() => {
            register();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
