import { inject } from '@angular/core';
import { RenderMode, PrerenderFallback, ServerRoute } from '@angular/ssr';
import { PokemonsService } from './pokemons/services/pokemons.service';
import { lastValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      const pokemonsService = inject(PokemonsService);

      const count = await lastValueFrom(pokemonsService.getPokemonCount());
      const params = [];
      for (let i = 1; i <= count; i++) {
        params.push({ id: i.toString() });
      }
      return params;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
