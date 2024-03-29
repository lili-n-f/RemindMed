import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Medicines from "../screens/Medicines";
import PillFormPage from "../screens/PillFormPage";
import Profile from "../screens/Profile";
import Tracking from "../screens/Tracking";
import Icon, { Icons } from "./Icons";

const TabArr = [
  {
    route: "Itinerario",
    label: "Itinerario",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "pill",
    inActiveIcon: "pill",
    component: Medicines,
  },
  {
    route: "Agregar",
    label: "Agregar",
    type: Icons.Ionicons,
    activeIcon: "add-circle",
    inActiveIcon: "add-circle-outline",
    component: PillFormPage,
  },
  {
    route: "Seguimiento",
    label: "Seguimiento",
    type: Icons.Ionicons,
    activeIcon: "calendar",
    inActiveIcon: "calendar-outline",
    component: Tracking,
  },
  {
    route: "Perfil",
    label: "Perfil",
    type: Icons.Ionicons,
    activeIcon: "person",
    inActiveIcon: "person-outline",
    component: Profile,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Icon
        type={item.type}
        name={focused ? item.activeIcon : item.inActiveIcon}
        color={focused ? "#52489c" : "#bab6d7"}
      />
      <Text
        style={{
          color: focused ? "#52489c" : "#bab6d7",
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default function NavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
