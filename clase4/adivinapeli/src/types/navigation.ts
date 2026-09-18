import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Pelicula } from './pelicula';

export type PeliculasStackParamList = {
  PeliculasLista: undefined;
  PeliculaDetalle: { pelicula: Pelicula };
  PeliculaForm: { pelicula?: Pelicula } | undefined;
};

export type TabParamList = {
  InicioTab: undefined;
  JuegoTab: undefined;
  PeliculasTab: NavigatorScreenParams<PeliculasStackParamList> | undefined;
};
