import { h } from "preact"
import FormField from "./FormField"
import { getRolls, ScenarioResult } from "./rollSimulation"
import useForm from "./useForm"
import useNumberInput from "./useNumberInput"

export default function App() {
  const { fields, values } = useForm({
    attackerAttack: useNumberInput(),
    defenderHealth: useNumberInput(5),
    defenderDefense: useNumberInput(),
    defenderEvade: useNumberInput(),
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
    <main style={{ fontFamily: "Roboto, sans-serif" }}>
      <fieldset>
        <FormField
          label="Attacker +ATK"
          type="number"
          {...fields.attackerAttack.bind}
        />
      </fieldset>

      <fieldset>
        <FormField
          label="Defender HP"
          type="number"
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
      </fieldset>

      <p>
        <div style={{ color: chanceColor(rolls.defense.survivalChance) }}>
          Defense survival: {formatResultChance(rolls.defense)}
        </div>
        <div style={{ color: chanceColor(rolls.evade.survivalChance) }}>
          Evade survival: {formatResultChance(rolls.evade)}
        </div>
      </p>

      <pre>{JSON.stringify(rolls, null, 2)}</pre>
    </main>
  )
}
