import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SigIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
