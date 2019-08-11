import { h } from "preact"
import FormField from "./FormField"
import { getRolls, ScenarioResult } from "./rollSimulation"
import useForm from "./useForm"
import useNumberInput from "./useNumberInput"

export default function App() {
  const { fields, values } = useForm({
    attackerAttack: useNumberInput(),
    attackerDiceCount: useNumberInput(1),
    defenderHealth: useNumberInput(5),
    defenderDefense: useNumberInput(),
    defenderEvade: useNumberInput(),
    defenderDiceCount: useNumberInput(1),
  })

  const rolls = getRolls(values)

  const formatResultChance = (result: ScenarioResult) => {
    const percent = Math.round(result.survivalChance * 100)
    const fraction = `(${result.survivals} / ${result.rolls.length})`
    return `${percent}% ${fraction}`
  }

  const chanceColor = (chance: number) => {
    if (chance > 0.5) return "green"
    if (chance > 0.25) return "orange"
    return "red"
  }

  return (
    <main style={{ fontFamily: "Roboto, sans-serif", margin: "1rem" }}>
      <p>
        <FormField
          label="Attacker +ATK"
          type="number"
          {...fields.attackerAttack.bind}
        />
        <FormField
          label="Attacker Dice"
          type="number"
          {...fields.attackerDiceCount.bind}
        />
      </p>

      <p>
        <FormField
          label="Defender HP"
          type="number"
          min={1}
          {...fields.defenderHealth.bind}
        />
        <FormField
          label="Defender +DEF"
          type="number"
          {...fields.defenderDefense.bind}
        />
        <FormField
          label="Defender +EVD"
          type="number"
          {...fields.defenderEvade.bind}
        />
        <FormField
          label="Defender Dice"
          type="number"
          {...fields.defenderDiceCount.bind}
        />
      </p>

      <p>
        <div style={{ color: chanceColor(rolls.defense.survivalChance) }}>
          Defense survival: {formatResultChance(rolls.defense)}
        </div>
        <div style={{ color: chanceColor(rolls.evade.survivalChance) }}>
          Evade survival: {formatResultChance(rolls.evade)}
        </div>
      </p>
    </main>
  )
}
