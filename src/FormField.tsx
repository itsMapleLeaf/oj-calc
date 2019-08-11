import { h } from "preact"

type Props = h.JSX.HTMLAttributes & {
  label: string
}

export default function FormField({ label, ...inputProps }: Props) {
  return (
    <label style={{ display: "block" }}>
      {label} <input {...inputProps} />
    </label>
  )
}
