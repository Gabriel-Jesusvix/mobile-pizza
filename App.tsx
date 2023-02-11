import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Routes } from "./src/routes";
import { AuthProvider } from './src/contexts/AuthContext'
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle="default" backgroundColor="#1D1D2E" translucent />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
