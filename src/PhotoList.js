import React from "react";
import { View, FlatList } from "react-native";
import PhotoBox from "./PhotoBox";

// props ile verilen fotoğrafların tümünü listeleyen komponent
export default function PhotoList(props) {
  if (Object.keys(props.data) == 0) { // eğer verilen fotoğraf sayısı 0 sa çizecek fotoğraf olmadığından bitiriyoruz
    return null;
  }

  return (
    <FlatList
      data={Object.keys(props.data)}
      renderItem={({ item }) => {
        return <PhotoBox key={item} id={item} data={props.data[item]} />;
      }}
      numColumns={3}
      keyExtractor={(item) => item}
      style={{ alignSelf: "center", marginTop: 8 }}
    />
  );
}
