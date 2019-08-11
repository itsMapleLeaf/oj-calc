type FieldMap = {
  [inputName: string]: {
    value: unknown
  }
}

type FieldValues<Fields extends FieldMap> = {
  [K in keyof Fields]: Fields[K]["value"]
}

function useForm<Fields extends FieldMap>(fields: Fields) {
  const values = {} as FieldValues<Fields>
  for (const inputName in fields) {
    values[inputName] = fields[inputName].value
  }

  return { fields, values }
}

export default useForm
