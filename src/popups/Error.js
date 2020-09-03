import React from "react";
import { Image, Modal, Text, View, StatusBar } from "react-native";
import colors from "../../assets/styles/colors";
import style from "../../assets/styles/style";
import MyButton from "../MyButton";

// Bir hata alındığında kullanıcıya gösterilen popup
export default function Error(props) {
  return (
    <Modal
      animationType="none"
      visible={props.visible == null ? false : props.visible}
      transparent={true}
    >
      <View style={style.centeredView}>
        <View style={style.outlinedWhiteContainer}>
          <Image
            source={require("../../assets/images/icon_error.png")}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              alignSelf: "center",
              color: colors.primary,
              marginBottom: 10,
              fontSize: 33,
              fontWeight: "bold",
            }}
          >
            Hata!
          </Text>
          <Text
            style={{
              alignSelf: "center",
              color: colors.primary,
              marginBottom: 25,
              marginTop: 15,
            }}
          >
            {props.children}
          </Text>
          <MyButton
            buttonStyle={{
              marginTop: 9,
              width: 292,
              backgroundColor: colors.negative,
            }}
            onPress={props.onClose}
          >
            TAMAM
          </MyButton>
        </View>
      </View>
      <StatusBar hidden={true} />
    </Modal>
  );
}
