import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ListItem } from "../../components/ListItem";
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

type ProductProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};
export function Order() {
  const [category, setCategory] = useState<CategoryListProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    CategoryListProps | undefined
  >();
  const [amount, setAmount] = useState("1");
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const route = useRoute<OrderRouteProps>();
  const { goBack, navigate } = useNavigation();

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
  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

  async function handleAddProduct() {
    const response = await api.post("/order/add", {
      order_id: route.params?.order_id,
      product_id: productSelected.id,
      amount: Number(amount),
    });
    let data = {
      id: response.data.id,
      product_id: productSelected.id as string,
      name: productSelected.name as string,
      amount,
    };

    setItems((oldState) => [...oldState, data]);
  }

  async function handleDeleteProduct(item_id: string) {
    await api.delete("/order/remove", {
      params: {
        item_Id: item_id,
      },
    });

    let removeItems = items.filter((item) => item.id !== item_id);

    setItems(removeItems);
  }

  function handleFinishOrder() {
    navigate("FinishedOrder", {
      number: route.params.number,
      order_id: route.params.order_id,
    });
  }
  useEffect(() => {
    async function loadCatagory() {
      const response = await api.get("/category");
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }
    loadCatagory();
  }, []);

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,
        },
      });

      setProducts(response.data);
      setProductSelected(response.data[0]);
    }
    loadProduct();
  }, [categorySelected]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo ORDER</Text>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={deleteOrder}>
          {items.length <= 0 && (
            <Feather name="trash-2" size={28} color="#FF3F4B" />
          )}
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

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#FFFFFF" }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

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
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddProduct}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}> Avançar </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDeleteProduct} />
        )}
      />

      <Modal transparent visible={modalCategoryVisible} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal transparent visible={modalProductVisible} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </SafeAreaView>
  );
}
