import { h } from "preact"

type Props = h.JSX.HTMLAttributes & {
  label: string
}

export default function FormField(props: Props) {
  return (
    <label style={{ display: "block" }}>
      {props.label}{" "}
      <input type={props.type} value={props.value} onChange={props.onChange} />
    </label>
  )
}
