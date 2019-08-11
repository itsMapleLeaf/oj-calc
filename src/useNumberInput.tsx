import { useState } from "preact/hooks"

export default function useNumberInput(initialValue = 0) {
  const [value, setValue] = useState(initialValue)

  const bind = {
    value,
    onChange: (event: Event) => {
      if (event.currentTarget instanceof HTMLInputElement) {
        setValue(event.currentTarget.valueAsNumber)
      }
    },
  }

  return { value, set: setValue, bind }
}
