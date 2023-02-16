import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type LisItemProp = {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  deleteItem: (item_id: string) => void;
};
export function ListItem({ data, deleteItem }: LisItemProp) {
  function handleDeleteProduct() {
    deleteItem(data.id);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.nameProduct}>
        {data.amount} - {data.name}
      </Text>
      <TouchableOpacity onPress={handleDeleteProduct}>
        <Feather name="trash-2" color="#FF3F4B" size={25} />
      </TouchableOpacity>
    </View>
  );
}
