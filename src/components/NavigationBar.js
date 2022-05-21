import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medicines from '../screens/Medicines';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Medicamentos"
        component={Profile}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Perfil"
        component={Medicines}
      />
    </Tab.Navigator>
  );
}
