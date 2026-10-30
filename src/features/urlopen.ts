/**
 * Construye un enlace de Google Maps a partir de las
 * coordenadas geográficas recibidas.
 */
export function getGoogleMapsUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
