import LottieView from 'lottie-react-native';
import { StyleSheet, View } from "react-native";
import LoadingPizza from '../assets/lottie/pizza-lottie.json';
import { useAuth } from "../contexts/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
export function Routes() {
  const { isUser,loadingStorage } = useAuth()
  


  if (loadingStorage) {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LottieView 
        source={LoadingPizza}
        style={styles.loadingPizza}
        autoPlay
        autoSize
        loop
      />
    </View>
    )
  }
  return isUser ? <AppRoutes /> : <AuthRoutes />;
} 


const styles = StyleSheet.create({
  loadingPizza: {
    width: 250,
    height: 250,
  }
})