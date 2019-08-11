import { h } from "preact"
import FormField from "./FormField"
import { getRolls } from "./rollSimulation"
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

  return (
    <main>
      <FormField
        label="Attacker +ATK"
        type="number"
        {...fields.attackerAttack.bind}
      />
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

      <pre>{JSON.stringify(rolls, null, 2)}</pre>
    </main>
  )
}
