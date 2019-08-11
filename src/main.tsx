import { h, render } from "preact"
import { useState } from "preact/hooks"

function App() {
  const [on, setOn] = useState(false)
  return <button onClick={() => setOn(v => !v)}>{on ? "on" : "off"}</button>
}

render(<App />, document.querySelector("#root")!)
