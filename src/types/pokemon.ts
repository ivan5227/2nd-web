import { z } from 'zod';

const PokemonTypeSchema = z.object({
  type: z.object({
    name: z.string(),
  }),
});

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  weight: z.number(),
  types: z.array(PokemonTypeSchema),
  sprites: z.object({
    front_default: z.string().nullable(),
    other: z
      .object({
        'official-artwork': z
          .object({
            front_default: z.string().nullable().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; pokemons: Pokemon[] };
