import React, { useState } from "react";

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { api } from '../../services/api';
import { styles } from "./styles";

export function Dashboard() {
  const [numberTable, setNumberTable] = useState('');
  const { navigate } = useNavigation()


  async function openOrder() {
    if(numberTable === '') {
      return;
    }
    const response = await api.post('/order',  {
      table: Number(numberTable),
    })
    navigate('Order', {
      number: numberTable,
      order_id: response.data.id,
    })

    setNumberTable('');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput 
        style={styles.input}
        keyboardType="numeric"
        placeholder="Numero da mesa"
        placeholderTextColor="#FFF"
        value={numberTable}
        onChangeText={(numberTable) => setNumberTable(numberTable)}
      />
      
      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
