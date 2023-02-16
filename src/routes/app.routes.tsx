import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../pages/Dashboard";
import { FinishedOrder } from "../pages/FinishedOrder";
import { Order } from "../pages/Order";

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FinishedOrder"
        component={FinishedOrder}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
