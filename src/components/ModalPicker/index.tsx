import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryListProps } from "../../pages/Order";
import { styles } from "./styles";

type ModalProps = {
  options: CategoryListProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryListProps) => void;
};

export const { width: WIDTH, height: HEIGTH } = Dimensions.get("window");

export function ModalPicker({
  options,
  handleCloseModal,
  selectedItem,
}: ModalProps) {
  function selectItem(item: CategoryListProps) {
    selectedItem(item);
    handleCloseModal();
  }
  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => selectItem(item)}
    >
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}
