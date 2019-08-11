function getFormValues<I extends { [inputName: string]: { value: unknown } }>(
  inputs: I,
) {
  const values = {} as { [K in keyof I]: I[K]["value"] }
  for (const inputName in inputs) {
    values[inputName] = inputs[inputName].value
  }
  return values
}

export default getFormValues
