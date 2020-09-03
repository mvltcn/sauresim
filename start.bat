@echo on
cd android && ^
gradlew clean && ^
cd .. && ^
react-native run-android
@pause