export type Roll = {
  attackerRoll: number
  defenderRoll: number
  healthRemaining: number
}

export type ScenarioResult = {
  survivals: number
  survivalChance: number
  rolls: Roll[]
}

function getPossibleDiceRolls(diceCount: number) {
  if (diceCount === 0) return []
  if (diceCount === 1) return [1, 2, 3, 4, 5, 6]

  const rolls: number[] = []
  for (let i = 1; i <= 6; i++) {
    for (const lowerRoll of getPossibleDiceRolls(diceCount - 1)) {
      rolls.push(i + lowerRoll)
    }
  }
  return rolls
}

export function getRolls(values: {
  attackerAttack: number
  attackerDiceCount: number
  defenderHealth: number
  defenderDefense: number
  defenderEvade: number
  defenderDiceCount: number
}) {
  const defenseRolls: Roll[] = []
  const evadeRolls: Roll[] = []

  let defenseSurvivals = 0
  let evadeSurvivals = 0

  for (const attackerRoll of getPossibleDiceRolls(values.attackerDiceCount)) {
    for (const defenderRoll of getPossibleDiceRolls(values.defenderDiceCount)) {
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

  const defense: ScenarioResult = {
    survivals: defenseSurvivals,
    survivalChance: defenseSurvivals / defenseRolls.length,
    rolls: defenseRolls,
  }

  const evade: ScenarioResult = {
    survivals: evadeSurvivals,
    survivalChance: evadeSurvivals / evadeRolls.length,
    rolls: evadeRolls,
  }

  return { defense, evade }
}
