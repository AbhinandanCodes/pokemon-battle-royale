export interface MoveCache {
  id: number;
  name: string;
  type: string;
  power: number;
  pp: number;
  damageClass: string;
  priority: number;
  accuracy: number;
}

export interface Move extends MoveCache {}

export interface PokemonCache {
  id: number;
  name: string;
  type: string;
  stat: Stat;
  movesId: number[];
  sprite: string;
}

export interface Pokemon extends PokemonCache {
  move: Move;
}

export interface Stat {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  speed: number;
}

export interface PokemonsState {
  loading: boolean;
  data: Pokemon[];
  error: string | null;
}

export interface StatData {
  base_stat: number;
}

export interface MoveObject {
  move: {
    url: string;
  };
}
