import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getUserLikes } from "../Database";
import colors from "../../assets/styles/colors";
import PhotoList from "../PhotoList";
import TabTitle from "../TabTitle";
import Loading from "../Loading";

// Beğendiklerin sayfası
export default function Likes({ navigation }) {
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // şuanki giriş yapmış kullanıcının beğendiği fotoğrafları databaseden çekiyoruz
    const subscriber = getUserLikes(auth().currentUser.uid).onSnapshot(
      (querySnapshot) => {
        console.log("Begeniler sayfasi icin fotograflar cekildi!");
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setUserLikes(data);
        setLoading(false);
      }
    );

    return subscriber;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <TabTitle title="Beğendiklerin" />
      {Object.keys(userLikes).length == 0 ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            textAlignVertical: "center",
            height: "80%",
          }}
        >
          Henüz hiç bir şey beğenmedin.
        </Text>
      ) : (
        <PhotoList data={userLikes} />
      )}
    </View>
  );
}
