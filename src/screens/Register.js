import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import style from "../../assets/styles/style";
import colors from "../../assets/styles/colors";
import Error from "../popups/Error";

// Kayıt sayfası
export default function Register({ navigation, screenName }) {
  const [name, setName] = useState(""); // kullanıcının girdiği adı
  const [email, setEmail] = useState(""); // kullanıcının girdiği mail
  const [pass, setPass] = useState(""); // kullanıcının girdiği şifresi
  const [passAgain, setPassAgain] = useState(""); // kullanıcının girdiği şifresinin tekrar girişi
  const [errorScreenVisible, setErrorScreenVisible] = useState(false); // hata ekranı görünsün mü ilk başta false yani kapalı
  const [errorMesage, setErrorMesage] = useState(""); // hata ekranında gösterilecek yazı

  let emailInput, passwordInput, passwordAgainInput;

  // verilen yazıyla hata ekranını gösteren fonksiyon
  function showErrorScreen(message) {
    setErrorMesage(message); // verilen yazıyı gösterilecek hata olarak belirliyoruz
    setErrorScreenVisible(true); // hata ekranının görünürlüğünü görünür yapıyoruz
  }

  // kayıt sayfasında kayıt ol butonuna tıklandığında çağrılan fonksiyon
  function register() {
    if (name.length == 0 || email.length == 0 || pass.length == 0) {
      // eğer kayıt için girilen alanlar boşsa
      showErrorScreen("Tüm alanlar doldurulmalıdır!"); // hata göster
      return;
    }

    if (pass.length < 6) {
      // eğer girilen şifrenin uzunluğu 6dan küçükse
      showErrorScreen("Şifre en az 6 karakterli olmalıdır!"); // hata göster
      return;
    }

    if (pass !== passAgain) {
      // eğer kayıt olurken şifre ve şifre tekrarı alanına girilenler uyuşmuyorsa
      showErrorScreen("Şifreler uyuşmuyor!"); // hata göster
      return;
    }

    console.log("Kayit olunmaya calisiliyor...");

    // firebaseye ulaşıp verdiğimiz email ve şifre ile kullanıcı kaydı yapmasını söylüyoruz
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredentials) => {
        // firebasenin verdiği cevap
        if (userCredentials.user) {
          // eğer kullanıcı oluşturulması başarılıysa
          console.log("Kayit basarili!");
          userCredentials.user
            .updateProfile({
              displayName: name, // oluşturulan kullanıcının adını belirliyoruz
            })
            .then((s) => {
              console.log("Ana sayfaya geciliyor...");
              navigation.reset({
                // kayıt tamamlandığında ana sayfaya gidip geçmişi de siliyoruz ki ana sayfadan geri tuşuna basılarak kayıt sayfasına dönülmesin
                index: 0,
                routes: [{ name: "Home" }],
              });
            });
        }
      })
      .catch((error) => {
        // kayıt olurken bir hata olduysa
        if (error.code === "auth/email-already-in-use") {
          // eğer hata bu email kullanılıyor hatasıysa
          showErrorScreen("Bu e-posta adresi zaten kullanılıyor!"); // hata göster
          return;
        }

        if (error.code === "auth/invalid-email") {
          // eğer hata bu email geçersiz hatasıysa
          showErrorScreen("Geçersiz e-posta!"); // hata göster
          return;
        }

        showErrorScreen("Bilinmeyen hata!"); // hata bunlardan biri değilse kalan tüm hataları içeren bir hata göste
      });
  }

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
      <Text
        style={{
          fontSize: 25,
          color: colors.primary,
        }}
      >
        Üye Kaydı
      </Text>
      <TextInput
        style={style.textinput}
        placeholder="Ad"
        placeholderTextColor={colors.primary}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={() => {
          emailInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          emailInput = input;
        }}
        onChangeText={(text) => setEmail(text)}
        autoCompleteType="email"
        style={style.textinput}
        placeholder="E-posta"
        placeholderTextColor={colors.primary}
        onSubmitEditing={() => {
          passwordInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          passwordInput = input;
        }}
        onChangeText={(text) => setPass(text)}
        autoCompleteType="password"
        secureTextEntry={true}
        style={style.textinput}
        placeholder="Şifre"
        placeholderTextColor={colors.primary}
        onSubmitEditing={() => {
          passwordAgainInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          passwordAgainInput = input;
        }}
        autoCompleteType="password"
        secureTextEntry={true}
        style={style.textinput}
        placeholder="Şifre Tekrarı"
        placeholderTextColor={colors.primary}
        onChangeText={(text) => setPassAgain(text)}
        onSubmitEditing={() => {
          register();
        }}
      />
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
  );
}
