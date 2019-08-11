type FieldMap = {
  [inputName: string]: {
    value: unknown
  }
}

function useForm<Fields extends FieldMap>(fields: Fields) {
  const values = {} as { [K in keyof Fields]: Fields[K]["value"] }
  for (const inputName in fields) {
    values[inputName] = fields[inputName].value
  }

  return { fields, values }
}

export default useForm
