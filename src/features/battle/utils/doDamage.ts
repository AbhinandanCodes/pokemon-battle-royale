import {BattlePokemon } from "../types";
import {
  applyDamage,
  canAttack,
  didMoveHit,
  isImmune,
  logDamageEvents,
} from "./damageUtils";
import { getEffectiveness } from "./typeEffectiveness";

export const doDamage = (
  attackerIdx: number,
  defenderIdx: number,
  battleState: BattlePokemon[],
): void => {
  const attacker = battleState[attackerIdx];
  const defender = battleState[defenderIdx];
  if (!canAttack(attacker, defender)) return;
  if (!didMoveHit(attacker,defender)) return;
  const effectiveness = getEffectiveness(attacker.move.type, defender.type);
  if (isImmune(attacker, defender, effectiveness)) return;
  const result = applyDamage(attacker, defender, effectiveness);
  logDamageEvents(attacker, defender, result);
};
