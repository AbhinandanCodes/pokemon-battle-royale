import { BattlePokemon, DamageData} from "../types";


const isCriticalHit = (): boolean => {
  return Math.random() < 1 / 16; 
};

const isPhysical = (damageClass:string):boolean=>{
    return damageClass === "physical"
}

const isStab = (attacker:BattlePokemon):boolean=>{
    return attacker.type === attacker.move.type 
}

export const calculateDamage = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  effectiveness: number,
  level:number
): DamageData => {
  const power = attacker.move.power;

  const isPhysicalAttack = isPhysical(attacker.move.damageClass);
  const attackStat = isPhysicalAttack ? attacker.stat.atk : attacker.stat.spatk;
  const defenseStat = isPhysicalAttack ? defender.stat.def : defender.stat.spdef;

  const stab = isStab(attacker) 
  const stabCalc = stab ? 1.5 : 1;

  const critical = isCriticalHit();
  const critMultiplier = critical ? 1.5 : 1;

  const randomFactor = 0.85 + Math.random() * 0.15;

  let damage =
    (((2 * level) / 5 + 2) * power * (attackStat / defenseStat)) / 50 + 2;

  damage *= stabCalc * effectiveness * critMultiplier * randomFactor;

  return {
    damage: Math.floor(damage),
    critical: critical,
    effectiveness: effectiveness,
    stab: stab
  };
};
