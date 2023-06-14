import React from "react";
import { useForm, useFormInput } from "../../hooks";

export default function FormWrapper() {
  const formState = useForm();
  return (
    <form>
      <InputGroup name="City: " inputId="city-input-field" type="text" />
      <InputGroup name="State: " inputId="state-input-field" type="text" />
    </form>
  );
}

export function Input(props) {
  const [input, setInput] = React.useState(props.defaultState || "");
  const state = useFormInput(props.defaultState);
  console.log(props.name + "input rendered");
  return (
    <input
      type={state.type}
      id={state.id}
      name={state.name}
      value={state.value}
      onChange={(e) => state.onChange(e.target.value)}

      //   type={props.type}
      //   id={props.inputId}
      //   name={props.name}
      //   value={input}
      //   onChange={(e) => setInput(e.target.value)}
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
