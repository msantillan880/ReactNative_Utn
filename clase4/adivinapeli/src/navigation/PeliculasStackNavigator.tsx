import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeliculaDetalleScreen from '../screens/PeliculaDetalleScreen';
import PeliculaFormScreen from '../screens/PeliculaFormScreen';
import PeliculasScreen from '../screens/PeliculasScreen';
import type { PeliculasStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<PeliculasStackParamList>();

export default function PeliculasStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PeliculasLista"
        component={PeliculasScreen}
        options={{ title: 'Películas' }}
      />
      <Stack.Screen
        name="PeliculaDetalle"
        component={PeliculaDetalleScreen}
        options={{ title: 'Detalle de película' }}
      />
      <Stack.Screen
        name="PeliculaForm"
        component={PeliculaFormScreen}
        options={({ route }) => ({
          title: route.params?.pelicula ? 'Editar película' : 'Nueva película'
        })}
      />
    </Stack.Navigator>
  );
}
