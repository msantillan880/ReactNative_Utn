import AsyncStorage from '@react-native-async-storage/async-storage';
import { peliculasIniciales } from '../data/peliculasIniciales';
import type { Pelicula } from '../types/pelicula';

const STORAGE_KEY = '@adivina_la_pelicula/peliculas';

function parsePeliculas(json: string): Pelicula[] {
  const parsed = JSON.parse(json) as unknown;
  if (!Array.isArray(parsed)) {
    return peliculasIniciales;
  }
  return parsed as Pelicula[];
}

export async function obtenerPeliculas(): Promise<Pelicula[]> {
  const datos = await AsyncStorage.getItem(STORAGE_KEY);

  if (datos) {
    return parsePeliculas(datos);
  }

  await guardarPeliculas(peliculasIniciales);
  return peliculasIniciales;
}

export async function guardarPeliculas(peliculas: Pelicula[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(peliculas));
}

export async function agregarPelicula(pelicula: Pelicula): Promise<Pelicula[]> {
  const peliculas = await obtenerPeliculas();
  const nuevas = [...peliculas, pelicula];
  await guardarPeliculas(nuevas);
  return nuevas;
}

export async function actualizarPelicula(
  peliculaActualizada: Pelicula
): Promise<Pelicula[]> {
  const peliculas = await obtenerPeliculas();
  const nuevas = peliculas.map((pelicula) =>
    pelicula.id === peliculaActualizada.id ? peliculaActualizada : pelicula
  );
  await guardarPeliculas(nuevas);
  return nuevas;
}

export async function eliminarPelicula(id: string): Promise<Pelicula[]> {
  const peliculas = await obtenerPeliculas();
  const nuevas = peliculas.filter((pelicula) => pelicula.id !== id);
  await guardarPeliculas(nuevas);
  return nuevas;
}
