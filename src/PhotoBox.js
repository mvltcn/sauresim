import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { likeImage, unLikeImage } from "./Database";
import colors from "../assets/styles/colors";
import style from "../assets/styles/style";

// Tek bir fotoğrafı gösteren komponent
export default function PhotoBox(props) {
  const navigation = useNavigation();

  return (
    <View style={style.photobox}>
      <TouchableHighlight
        onPress={() => {
          // Fotoğrafa tıklandığında fotoğrafın detaylarını gösteren sayfayı açıyoruz
          navigation.push("ImageDetails", {
            data: props.data,
            id: props.id,
          });
        }}
      >
        <Image
          source={{ uri: props.data.thumbnail }}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableHighlight>
      <TouchableOpacity
        style={style.likescontainer}
        onPress={() => { // Fotoğrafın yanındaki kalp butonuna basınca eğer fotoğrafı beğenmişsek beğeniyi kaldırıyoruz, beğenmediysek beğeni ekliyoruz
          if (!props.data.likes.includes(auth().currentUser.uid)) {
            likeImage(props.id, props.data.likes);
          } else {
            unLikeImage(props.id, props.data.likes);
          }
        }}
      >
        <Text
          style={{
            color: props.data.likes.includes(auth().currentUser.uid)
              ? colors.important
              : colors.white,
            marginLeft: 2,
            marginRight: 2,
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          {props.data.likes.length}
        </Text>
        <Image
          source={
            props.data.likes.includes(auth().currentUser.uid)
              ? require("../assets/images/icon_like_liked.png")
              : require("../assets/images/icon_like.png")
          }
          style={{ marginRight: 2, top: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
}
