import { StyleSheet } from "react-native";
import colors from "./colors";

// uygulama görünüşü

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 12,
  },
  outlinedWhiteContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 12,
  },
  textinput: {
    marginTop: 14,
    color: colors.primary,
    fontSize: 17,
    borderColor: colors.primary,
    width: 245,
    height: 40,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  button: {
    padding: 8,
    backgroundColor: colors.primary,
    marginTop: 14,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
  tabtitle: {
    fontSize: 33,
    marginLeft: 20,
    marginTop: 36,
    color: colors.primary,
  },
  photobox: {
    width: 100,
    height: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    margin: 3,
  },
  likescontainer: {
    position: "absolute",
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0,0, 0.5)",
    padding: 2,
    alignContent: "center",
    bottom: 0,
    alignItems: "center",
  },
});
