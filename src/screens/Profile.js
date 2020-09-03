import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { getUserImages } from "../Database";
import colors from "../../assets/styles/colors";
import MyButton from "../MyButton";
import PhotoList from "../PhotoList";
import Loading from "../Loading";
import Uploading from "../popups/Uploading";
import AvatarNamePostsLikes from "../AvatarNamePostsLikes";
import TabTitle from "../TabTitle";

const imagePickerOptions = {
  title: "YÜKLENECEK FOTOĞRAF",
  cancelButtonTitle: "İptal",
  takePhotoButtonTitle: "Fotoğraf çek...",
  chooseFromLibraryButtonTitle: "Fotoğraflarından seç...",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

// TODO: fotoğraf timestamp ına a göre sort
// TODO: activetask.cancel hata veriyor
// TODO: profil fotoğrafı?
// TODO: isim değiştirebilme özelliği?

// kullanıcılarının profilini görüntülemeye yarayan komponent
export default function Profile({ route, navigation }) {
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false); // fotoğraf yükleniyor ekranı görünür mü
  const [uploadDialogProgress, setUploadDialogProgress] = useState(0); // fotoğraf yükleniyor ekranının yüzdesi
  const [userPostCount, setUserPostCount] = useState(0); // profili görüntülenen kişinin gönderi sayısı
  const [userLikesCount, setUserLikesCount] = useState(0); // profili görüntülenen kişinin aldığı beğeni sayısı
  const [userImages, setUserImages] = useState({}); // profili görüntülenen kişinin yüklediği fotoğraflar
  const [isLoading, setLoading] = useState(true); // profil sayfası nın yükleniyor durumu
  const uid = route.params ? route.params.uid : auth().currentUser.uid; // profilini görüntülediğimiz kişinin kullanıcı idsi
  var activeTask;

  // profil sayfasında yeni yükle butonuna tıklanınca çağrılan fonksiyon
  async function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      // fotoğraf seçici çağrılıyor
      if (response.didCancel) {
        // fotoğraf seçimi iptal edildiyse
        console.log("Kullanici fotograf secimini iptal etti.");
        return;
      }
      const reference = storage().ref("user/" + uid + "/" + response.fileName); // firebasede fotoğrafın kaydedileceği yer
      const pathToFile = response.path; // seçilen fotoğrafın yolu
      activeTask = reference.putFile(pathToFile); // fotoğrafı yükleme işlemini yapacak görev
      console.log("activetask");
      console.log(activeTask);
      setUploadDialogVisible(true); // fotoğraf yükleniyor ekranını görünür yapıyoruz
      activeTask.on("state_changed", (taskSnapshot) => {
        // fotoğraf yükleme görevinin durumu değiştiğinde (fotoğraf yüklenirken %kaç yüklendiğinde)
        setUploadDialogProgress(
          // yükleniyor ekranının yüzdesini %kaç yüklendiği yapıyoruz
          Math.floor(
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100 
          )
        );
      });
    });
  }

  useEffect(() => {
    // profili görüntülenen kullanıcının tüm resimlerini alıyoruz
    const subscriber = getUserImages(uid).onSnapshot((querySnapshot) => {
      console.log("Profil sayfasi icin fotograflar cekildi!");
      let data = [];
      let totalLikes = 0;
      querySnapshot.forEach((documentSnapshot) => {
        data[documentSnapshot.id] = documentSnapshot.data();
        totalLikes += documentSnapshot.data().likes.length; // resimlerine gelen beğenileri topluyoruz
      });
      setUserLikesCount(totalLikes); // kullanıcının aldığı beğeni sayısını resimlerine gelen beğenilerin toplamı yapıyoruz
      setUserPostCount(Object.keys(data).length); // kullanıcının gönderi sayısını fotoğraflarının sayısı yapıyoruz
      setUserImages(data); // kullanıcının fotoğraflarını belirliyoruz
      setLoading(false); // profil sayfasının yüklenme durumunu yüklenmiyor olarak değiştiriyoruz
    });
    return subscriber;
  }, []);

  // profil sayfası henüz yüklenmediyse yükleniyor... olarak göster
  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <Uploading
        visible={uploadDialogVisible}
        progress={uploadDialogProgress}
        onClose={() => {
          setUploadDialogVisible(false);
        }}
        onCancel={() => {
          console.log("activetask cancelling");
          console.log(activeTask);
          activeTask.cancel();
          setUploadDialogVisible(false);
        }}
      />
      {uid != auth().currentUser.uid ? (
        <View style={{ marginTop: 28 }} />
      ) : (
        <TabTitle title="Profilin">
          <TouchableOpacity
            onPress={() => {
              navigation.push("Settings"); // ayarlar butonuna tıklanınca ayarlar sayfasını Stack in üstüne ekle yani o sayfaya geçiyoruz
            }}
            style={{
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: 20,
            }}
          >
            <Image source={require("../../assets/images/icon_settings.png")} />
          </TouchableOpacity>
        </TabTitle>
      )}
      <AvatarNamePostsLikes
        data={{
          uid: uid,
          likesCount: userLikesCount,
          postCount: userPostCount,
        }}
      />
      {uid == auth().currentUser.uid && (
        <MyButton
          buttonStyle={{
            marginTop: 8,
            width: 312,
            backgroundColor: colors.positive,
            alignSelf: "center",
          }}
          onPress={upload}
        >
          YENİ YÜKLE
        </MyButton>
      )}
      {Object.keys(userImages).length == 0 ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            textAlignVertical: "center",
            height: "80%",
          }}
        >
          Henüz hiç bir şey yüklemedi.
        </Text>
      ) : (
        <PhotoList data={userImages} /> // kullanıcının fotoğraflarını gösteriyoruz
      )}
    </View>
  );
}
