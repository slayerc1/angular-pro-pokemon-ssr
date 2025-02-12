import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerRoute, RenderMode } from '@angular/ssr';
import { PokemonAPIResponse } from './pokemons/interfaces';
import { lastValueFrom } from 'rxjs';

const TOTAL_POKEMONS = 151;

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const params = [];
      for (let i = 1; i <= TOTAL_POKEMONS; i++) {
        params.push({ id: i.toString() });
      }

      const http = inject(HttpClient);

      const pokemonNameList = await lastValueFrom(
        http.get<PokemonAPIResponse>(
          `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
        )
      );
      pokemonNameList.results.map(({ name }) => params.push({ id: name }));
      return params;
    },
  },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pages = TOTAL_POKEMONS / 20;
      const params = [];
      for (let i = 1; i <= pages; i++) {
        params.push({ page: i.toString() });
      }
      return params;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
