import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./MainStack";
import { ProfileScreen } from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export function TabBar() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={MainStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, size }) => {
                const iconName = focused ? "ios-home" : "ios-home-outline";
                const iconColor = focused ? "#FAB62F" : "#CDCDCD";

                return (
                  <Ionicons
                    name={iconName}
                    color={iconColor}
                    size={size}
                  ></Ionicons>
                );
              },
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused, size }) => {
                const iconName = focused
                  ? "md-person-sharp"
                  : "md-person-outline";
                const iconColor = focused ? "#FAB62F" : "#CDCDCD";

                return (
                  <Ionicons
                    name={iconName}
                    color={iconColor}
                    size={size}
                  ></Ionicons>
                );
              },
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
