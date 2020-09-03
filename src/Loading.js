import React from "react";
import { View, Text } from "react-native";
import style from "../assets/styles/style";
import colors from "../assets/styles/colors";

// Yükleniyor ekranı
export default function Loading(props) {
  return (
    <View style={style.container}>
      <Text style={{ fontSize: 17, color: colors.primary }}>
        {props.children || "Yükleniyor..."}
      </Text>
    </View>
  );
}
