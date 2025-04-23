import { useAuthStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  const [token, setToken] = useState(null);
  const getToken = async() => {
    const tkn = await AsyncStorage.getItem("token");
    setToken(tkn);
  }
  getToken();
  useEffect(()=> {
    getToken();
  },[token]);
  console.log(token)
  return (
    <Redirect href={token==null?"/(auth)":"/(tabs)"} />
  );
}
