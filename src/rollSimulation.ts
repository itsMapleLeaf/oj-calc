type Roll = {
  attackerRoll: number
  defenderRoll: number
  healthRemaining: number
}

export function getRolls(values: {
  attackerAttack: number
  defenderHealth: number
  defenderDefense: number
  defenderEvade: number
}) {
  const defenseRolls: Roll[] = []
  const evadeRolls: Roll[] = []

  let defenseSurvivals = 0
  let evadeSurvivals = 0

  for (let attackerRoll = 1; attackerRoll <= 6; attackerRoll++) {
    for (let defenderRoll = 1; defenderRoll <= 6; defenderRoll++) {
      const buffedAttack = attackerRoll + values.attackerAttack
      const buffedDefense = defenderRoll + values.defenderDefense
      const buffedEvade = defenderRoll + values.defenderEvade

      const defenseHealthRemaining =
        values.defenderHealth - Math.max(1, buffedAttack - buffedDefense)

      const evadeHealthRemaining =
        buffedEvade > buffedAttack ? values.defenderHealth : 0

      defenseRolls.push({
        attackerRoll: buffedAttack,
        defenderRoll: buffedDefense,
        healthRemaining: defenseHealthRemaining,
      })

      evadeRolls.push({
        attackerRoll: buffedAttack,
        defenderRoll: buffedEvade,
        healthRemaining: evadeHealthRemaining,
      })

      defenseSurvivals += defenseHealthRemaining > 0 ? 1 : 0
      evadeSurvivals += evadeHealthRemaining > 0 ? 1 : 0
    }
  }

  return { defenseSurvivals, evadeSurvivals, defenseRolls, evadeRolls }
}
