import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medicines from '../screens/Medicines';
import Profile from '../screens/Profile';
import Welcome from '../screens/Welcome';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Welcome}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Medicamentos"
        component={Medicines}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Perfil"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
