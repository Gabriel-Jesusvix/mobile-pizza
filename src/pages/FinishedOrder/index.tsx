import React from "react";

import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { api } from "../../services/api";
import { styles } from "./styles";

type OrderProps = {
  FinishedOrder: {
    number: string | number;
    order_id: string;
  };
};
type OrderRouteProps = RouteProp<OrderProps, "FinishedOrder">;
export function FinishedOrder() {
  const route = useRoute<OrderRouteProps>();
  const { navigate } = useNavigation();

  async function handleFinished() {
    try {
      await api.put("order/send", {
        order_id: route.params.order_id,
      });

      navigate("Dashboard");
    } catch (error) {
      console.log("Error processing", error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Você deseja finalizar esse pedido?</Text>
      <Text style={styles.table}>Mesa {route.params?.number}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinished}>
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
        <Feather name="shopping-cart" size={22} color="#1D1D2E" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
