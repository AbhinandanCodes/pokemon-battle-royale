import { Pokemon } from "../pokemon/types";

export interface BattlePokemon extends Pokemon {
  maxHp:number;
  currentHp: number;
  isFainted: boolean;
}

export interface DamageData {
  damage: number;
  critical: boolean;
  effectiveness: number;
  stab: boolean;
}

export interface BattleState {
  pokemons: BattlePokemon[];
  winners: BattlePokemon[];
  battleLog: TurnLog[];
  battleEnd: boolean;
}

export interface TurnLog {
  turn: number;
  actions: ActionLog[];
}

export interface ActionLog {
  message: string;
  attackerId: number;
  defenderId: number;
  moveHit: boolean;
  defenderCurrentHp: number;
  defenderFainted?: boolean;
}

export type TurnLogger = (currTurn: TurnLog) => void;
