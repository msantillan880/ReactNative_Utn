import * as Location from "expo-location";

const DEV_FALLBACK_LOCATION = {
  latitude: -34.9214,
  longitude: -57.9545,
  accuracy: 1200,
};

const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === "development";
};

/**
 * Obtiene la ubicación GPS actual del dispositivo.
 *
 * En dispositivos reales con GPS activo, prioriza la ubicación real.
 * El fallback solo se usa en desarrollo para pruebas de flujo o cuando
 * la plataforma no tiene servicios de ubicación disponibles.
 */
export async function getCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
  accuracy: number | null;
}> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      if (isDevelopmentEnvironment()) {
        console.warn(
          "Permiso de ubicación denegado. Usando fallback de desarrollo.",
        );
        return DEV_FALLBACK_LOCATION;
      }
      throw new Error("Se necesita permiso de ubicación para pedir ayuda.");
    }

    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
      if (isDevelopmentEnvironment()) {
        console.warn(
          "Servicios de ubicación desactivados. Usando fallback de desarrollo.",
        );
        return DEV_FALLBACK_LOCATION;
      }
      throw new Error("Los servicios de ubicación están desactivados.");
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  } catch (error) {
    if (isDevelopmentEnvironment()) {
      console.warn(
        "Fallo al obtener GPS real. Usando ubicación de respaldo para desarrollo:",
        error,
      );
      return DEV_FALLBACK_LOCATION;
    }

    throw error;
  }
}
