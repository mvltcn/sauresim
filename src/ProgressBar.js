import React, { useState } from "react";
import { View, Text } from "react-native";
import style from "../assets/styles/style";
import colors from "../assets/styles/colors";

export default function ProgressBar(props) {
  const width = 292; // progress bar ın genişliği

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.primary,
        width: width,
        height: 40,
      }}
    >
      <View
        style={{
          backgroundColor: colors.important,
          width: (props.progress / 100) * (width - 2),
          height: 38,
        }}
      ></View>
      <Text
        style={{
          position: "absolute",
          alignSelf: "center",
          color: colors.primary,
          top: 10,
        }}
      >
        %{props.progress}
      </Text>
    </View>
  );
}
