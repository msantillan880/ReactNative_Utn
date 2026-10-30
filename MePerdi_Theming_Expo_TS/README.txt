MEPERDÍ — THEMEING ACCESIBLE PARA EXPO + TYPESCRIPT
==================================================

Este ejemplo implementa una paleta de marca personalizada con react-native-paper,
cumpliendo la consigna de la actividad: crear una paleta propia y aplicarla al tema.

Incluye además:
- Tema claro y tema de alto contraste.
- Selector global de tema, pensado para permanecer en todas las pantallas.
- Controles para aumentar/disminuir el tamaño del texto.
- Preferencias globales en un contexto React.
- Ejemplo de pantalla y de cómo envolver la navegación.

IMPORTANTE
- Este paquete es una base para integrar en tu proyecto, no una app completa.
- El ejemplo usa react-native-paper v5 y Expo con TypeScript.
- Los botones de tamaño modifican la escala de texto de los componentes que usan
  los estilos/helpers incluidos. No todos los componentes de terceros respetarán
  automáticamente esta escala; hay que aplicarla también en tus pantallas.

1) Instalar dependencias
------------------------
En la raíz del proyecto Expo:

npx expo install react-native-paper react-native-safe-area-context
npx expo install @expo/vector-icons

Si tu proyecto aún no tiene navegación, podés instalar React Navigation:
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack

2) Copiar archivos
------------------
Copiá la carpeta src/theme, src/contexts y src/components a tu proyecto.
Ajustá las rutas de importación según la estructura que ya tengas.

3) Integrar el proveedor en App.tsx
-----------------------------------
Consultá el ejemplo App.example.tsx. Si ya tenés navegación, NO la reemplaces:
mantené tu navegación y envolvela con <AccessibilityProvider> y <PaperProvider>.
La estructura general debe ser:

<AccessibilityProvider>
  <AppTheme />
</AccessibilityProvider>

AppTheme obtiene el tema del contexto y devuelve:
<PaperProvider theme={theme}>
  {/* tu navegación completa */}
</PaperProvider>

4) Agregar el selector en todas las páginas
-------------------------------------------
La opción más cómoda es poner <AccessibilityToolbar /> en un componente común
de cabecera o en una pantalla de configuración global. Si querés que esté visible
en todas las pantallas, ponelo en el layout compartido o en el header de navegación.
No lo copies de forma independiente en cada pantalla si podés evitarlo.

5) Uso del tamaño de texto
--------------------------
Importá useAccessibility() en cada pantalla y usá fontScale para estilos propios.
Ejemplo:

const { fontScale } = useAccessibility();
const styles = StyleSheet.create({
  title: { fontSize: 24 * fontScale },
  body: { fontSize: 16 * fontScale },
});

En componentes Paper, pasá style={{ fontSize: 16 * fontScale }} cuando corresponda.
No aumentes el tamaño de iconos indiscriminadamente: los iconos tienen un tamaño
propio y conviene mantener objetivos táctiles de al menos unos 44–48 dp.

6) Consideraciones de accesibilidad
-----------------------------------
- Alto contraste usa fondos oscuros y texto claro, con un color de acción amarillo.
- No dependas solo del color para indicar errores o estados.
- Usá etiquetas accesibles y texto explícito en los botones.
- Probá la app con tamaño de fuente grande, TalkBack y un teléfono real.
- El selector global permite cambiar el tema desde cualquier pantalla.
- El tamaño se limita entre 0.85x y 1.6x para evitar que la interfaz se rompa;
  ajustá estos límites según las pruebas con usuarios.
