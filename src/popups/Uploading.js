import React from "react";
import { Modal, StatusBar, Text, View } from "react-native";
import colors from "../../assets/styles/colors";
import style from "../../assets/styles/style";
import MyButton from "../MyButton";
import ProgressBar from "../ProgressBar";

// Kullanıcı bir fotoğraf yüklerken ne kadarı yüklendiğini vs. gösteren komponent
export default function Uploading(props) {
  return (
    <Modal
      animationType="none"
      visible={props.visible == null ? false : props.visible}
      transparent={true}
    >
      <View style={style.centeredView}>
        <View style={style.outlinedWhiteContainer}>
          <Text
            style={{
              alignSelf: "center",
              color: colors.primary,
              marginBottom: 10,
            }}
          >
            {props.progress == 100 ? "Yüklendi!" : "Yükleniyor..."}
          </Text>
          <ProgressBar progress={props.progress} />
          <MyButton
            onPress={props.progress == 100 ? props.onClose : props.onCancel}
            buttonStyle={{
              marginTop: 9,
              width: 292,
              backgroundColor:
                props.progress == 100 ? colors.positive : colors.negative,
            }}
          >
            {props.progress == 100 ? "KAPAT" : "İPTAL"}
          </MyButton>
        </View>
      </View>
      <StatusBar hidden={true} />
    </Modal>
  );
}
