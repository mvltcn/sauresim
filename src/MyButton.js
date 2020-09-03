import React from "react";
import { TouchableOpacity, Text } from "react-native";
import style from "../assets/styles/style";

export default function MyButton(props) {
  return (
    <TouchableOpacity
      style={{
        ...style.button,
        ...props.buttonStyle,
      }}
      activeOpacity={1}
      onPress={props.onPress}
    >
      <Text style={{ color: "white", fontSize: 17, ...props.textStyle }}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
