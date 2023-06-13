import React from "react";

function Input(props) {
  const [input, setInput] = React.useState(props.defaultState || "");
  console.log(props.name + "input rendered");
  return (
    <input
      type={props.type}
      id={props.inputId}
      name={props.name}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}

export function InputGroup(props) {
  console.log("InputGroup rendered");
  return (
    <div>
      <label htmlFor={props.inputId}>{props.name}</label>
      <Input type={props.type} id={props.inputId} name={props.name} />
    </div>
  );
}

export default function FastForm2() {
  console.log("Form rendered");
  return (
    <form>
      <InputGroup name="City: " inputId="city-input-field" type="text" />
      <InputGroup name="State: " inputId="state-input-field" type="text" />
    </form>
  );
}
