import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAllImages } from "../Database";
import colors from "../../assets/styles/colors";
import PhotoList from "../PhotoList";
import TabTitle from "../TabTitle";
import Loading from "../Loading";

// Keşfet sayfası
export default function Home({ navigation }) {
  const [images, setImages] = useState({}); // keşfet sayfasında gözükecek fotoğraflar
  const [isLoading, setLoading] = useState(true); // keşfet sayfasının yükleniyor olup olmaması

  useEffect(() => {
    // tüm fotoğrafları databaseden çekiyoruz
    const subscriber = getAllImages().onSnapshot((querySnapshot) => {
      console.log("Kesfet sayfasi icin fotograflar cekildi!");
      let data = [];
      querySnapshot.forEach((documentSnapshot) => {
        data[documentSnapshot.id] = documentSnapshot.data();
      });
      setImages(data); // çektiğimiz fotoğrafları keşfet sayfasının fotoğraflarına belirliyoruz
      setLoading(false); // keşfet sayfasının yükleniyor olma durumunu yüklenmiyor yapıyoruz
    });
    return subscriber;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <TabTitle title="Keşfet" />
      {Object.keys(images).length == 0 ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            textAlignVertical: "center",
            height: "80%",
          }}
        >
          Henüz hiç bir şey yüklenmedi.
        </Text>
      ) : (
        <PhotoList data={images} />
      )}
    </View>
  );
}
