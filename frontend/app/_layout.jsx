import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import ToastManager from "toastify-react-native"

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <ToastManager/>
    </Stack>
  )
}