import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function ExplicacionScreen() {
    const theme = useTheme();
    const { fontScale } = useAccessibility();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={styles.content}>
                <Text
                    variant="titleLarge"
                    style={{ color: theme.colors.onBackground, fontSize: 24 * fontScale, fontWeight: '700' }}
                >
                    ¿Cómo funciona?
                </Text>

                <Text
                    style={{
                        color: theme.colors.onBackground,
                        fontSize: 17 * fontScale,
                        lineHeight: 26 * fontScale,
                    }}
                >
                    Desde la barra superior podés activar alto contraste y
                    aumentar/disminuir el tamaño del texto, o volver a su
                    valor original.
                    {'\n'}
                    Al presionar el botón de ayuda, se abrirá la app de mensajes
                    y se enviará a los contactos la ubicación actual.
                    {'\n'}
                    Asimismo se simula el acceso a una api con jsonplaceholder,
                    el cual a futuro podría persistir un historial de pedidos de ayuda
                    o de ubicaciones.
                    y se muestra un mensaje de aviso en caso de que no se pueda
                    obtener la ubicación.
                </Text>


            </View>
            <View
                style={{
                    width: '100%',
                    padding: 16,
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: theme.colors.onSurface,
                    borderRadius: 12,
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Text
                    style={{
                        color: theme.colors.onSurface,
                        fontSize: 14 * fontScale,
                        lineHeight: 24 * fontScale,
                        textAlign: 'center',
                    }}
                >
                    Curso: React Native — UTN
                    {'\n'}
                    Autor: Ing. Marcelo Santillán
                    {'\n'}
                    Tecnologías: React Native, TypeScript y Expo.
                    {'\n'}
                    © 2026 — Todos los derechos reservados.
                </Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
        gap: 16,
    },
});