import { ActionLog, BattlePokemon, DamageData } from "../types";
import { calculateDamage } from "./damageCalculator";
import { LEVEL } from "./battleUtils";
import { addActionToTurnLog } from "./logger";

export const canAttack = (
  attacker: BattlePokemon,
  defender: BattlePokemon
): boolean => {
  const log: ActionLog = {
    message: "",
    attackerId: attacker.id,
    defenderId: defender.id,
    moveHit: false,
    defenderCurrentHp:defender.currentHp
  };
  if (attacker.isFainted) return false;
  if (attacker.move.pp === 0) {
    log.message = `${attacker.name} has no PP left for ${attacker.move.name}`;
    addActionToTurnLog(log);
    return false;
  }
  if (defender.isFainted) {
    log.message = `${attacker.name} tried to attack ${defender.name}, but they are already fainted`;
    addActionToTurnLog(log);
    return false;
  }
  return true;
};

export const didMoveHit = (
  attacker: BattlePokemon,
  defender: BattlePokemon
): boolean => {
  const hitRoll = Math.random() * 100;
  const moveHit = hitRoll <= attacker.move.accuracy;

  const log: ActionLog = {
    message: "",
    attackerId: attacker.id,
    defenderId: defender.id,
    moveHit: moveHit,
    defenderCurrentHp:defender.currentHp
  };

  if (!moveHit) {
    attacker.move.pp -= 1;
    log.message = `${attacker.name}'s move ${attacker.move.name} missed!`;
    addActionToTurnLog(log);
    return false;
  }

  return true;
};

export const isImmune = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  effectiveness: number
): boolean => {
  if (effectiveness === 0) {
    const log: ActionLog = {
      message: `${defender.name} is immune to ${attacker.move.type}-type moves!`,
      attackerId: attacker.id,
      defenderId: defender.id,
      moveHit: false,
      defenderCurrentHp:defender.currentHp
    };
    addActionToTurnLog(log);
    return true;
  }
  return false;
};

export const applyDamage = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  effectiveness: number
): DamageData => {
  attacker.move.pp -= 1;

  const result = calculateDamage(attacker, defender, effectiveness, LEVEL);
  defender.currentHp -= result.damage;

  if (defender.currentHp < 0) {
    defender.currentHp = 0;
    defender.isFainted = true;
  }

  return result;
};

export const logDamageEvents = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  result: DamageData
) => {
  let message = `${attacker.name} used ${attacker.move.name} on ${defender.name}.`;

  if (result.effectiveness === 0.5) {
    message += " It's not very effective.";
  } else if (result.effectiveness === 2) {
    message += " It's super effective!";
  }

  if (result.critical) {
    message += " Critical hit!";
  }

  if (result.stab) {
    message += " STAB bonus applied.";
  }

  if(defender.isFainted){
    message += `\n${defender.name} fainted!`;
  }

  const actionLog: ActionLog = {
    message,
    attackerId: attacker.id,
    defenderId: defender.id,
    moveHit: true,
    defenderFainted: defender.isFainted || false,
    defenderCurrentHp: defender.currentHp,
  };

  addActionToTurnLog(actionLog);
};

