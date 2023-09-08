import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
