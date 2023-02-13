import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ModalPicker } from "../../components/ModalPicker";
import { api } from "../../services/api";
import { styles } from "./styles";

type OrderProps = {
  Order: {
    number: string | number;
    order_id: string;
  };
};
type OrderRouteProps = RouteProp<OrderProps, "Order">;

export type CategoryListProps = {
  id: string;
  name: string;
};
export function Order() {
  const [category, setCategory] = useState<CategoryListProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryListProps>();
  const [amount, setAmount] = useState("1");
  const [modalCategoryVisible, setModalCategoryVisible] = useState(true);
  const route = useRoute<OrderRouteProps>();
  const { goBack } = useNavigation();

  async function deleteOrder() {
    try {
      const response = await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeCategory(item: CategoryListProps) {
    setCategorySelected(item);
  }

  useEffect(() => {
    async function loadCatagory() {
      const response = await api.get("/category");
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }
    loadCatagory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo ORDER</Text>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={deleteOrder}>
          <Feather name="trash-2" size={28} color="#FF3F4B" />
        </TouchableOpacity>
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFFFFF" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#FFFFFF" }}>Pizza de calabresa</Text>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={amount}
          onChangeText={(amount) => setAmount(amount)}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Avançar </Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalCategoryVisible} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>
    </SafeAreaView>
  );
}
