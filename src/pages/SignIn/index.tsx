import React, { useState } from "react";

import ViewLottie from 'lottie-react-native';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import pizzaLogo from "../../assets/lottie/pizzaprocess.json";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "../SignIn/styles";

export function SignIn() {
  const [email, setEmail] = useState('gabrielteste@gmail.com');
  const [password, setPassword] = useState('123456');
  const { signIn } = useAuth()


  async function handleLogin() {
    if(!email || !password){
      return Alert.alert('Por favor preencha os campos.')
    }
    await signIn({email, password})
  }
  return (
    <SafeAreaView style={styles.container}>
        <ViewLottie 
          source={pizzaLogo}
          style={styles.logoImg}
          autoPlay
          autoSize
          loop
        />
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#F0F0F0"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput 
            placeholder="Digite sua senha"
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
          />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
           ACESSAR 

          </Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
