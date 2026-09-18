import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PeliculasStackNavigator from './PeliculasStackNavigator';
import type { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#1f4fb2',
                tabBarInactiveTintColor: '#4b5563',
                tabBarLabelStyle: {
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: '600',
                    marginBottom: 2
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    paddingVertical: 2
                },
                tabBarStyle: {
                    height: 56 + Math.max(insets.bottom, 8),
                    paddingTop: 1,
                    paddingBottom: Math.max(insets.bottom, 8)
                }
            }}
        >
            <Tab.Screen
                name="InicioTab"
                component={HomeScreen}
                options={{ title: 'Inicio', tabBarLabel: 'Inicio' }}
            />
            <Tab.Screen
                name="JuegoTab"
                component={JuegoScreen}
                options={{ title: 'Juego', tabBarLabel: 'Juego' }}
            />
            <Tab.Screen
                name="PeliculasTab"
                component={PeliculasStackNavigator}
                options={{
                    headerShown: false,
                    title: 'Películas',
                    tabBarLabel: 'Películas'
                }}
            />
        </Tab.Navigator>
    );
}
