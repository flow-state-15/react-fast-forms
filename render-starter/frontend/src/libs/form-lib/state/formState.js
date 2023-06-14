// imports
import { nanoid } from "nanoid";
import React, { useState, useEffect, useCallback, useRef } from "react";

//!! spinners for async actions
//!! basic functionality for above, but modifiable via overloading a config object
//!! each input group can get a style object

//!! need heap storage for form states
// dynamic instances for new form components
export const __FormStateInstances = new Map();

export const defaultFormOptions = {
  //!! need submit logic
  handleSubmit: async () => {
    console.warn("Form submit function not provided");
  },
  //!! need validation logic
  //react spinner component
  spinner: null,
  //!! form state: changes, dirty fields, touched fields, reset function
  resetForm: null,
};

// todo: extract function defs and flatten
export const defaultInputOptions = {
  //!! field/button disabling
  id: "",
  className: "",
  inputName: "",
  disabled: false,
  type: "text",
  name: "",
  value: "",
  runOnChange: null,
  touched: false,
  isValid: false,
  validate: function (fn) {
    if (fn) {
      if (fn(this)) {
        this.isValid = true;
      }
    } else {
      console.warn("Input validation function not provided");
    }
  },
  onChange: (e) => {
    console.warn("DEFAULT CHANGE FN, e: ", e);
  },
  onFocus: function (fn) {
    this.touched = true;
    fn(this);
  },
  onBlur: function (fn) {
    fn(this);
  },
};

const resetFormValues = (inputObj) => {
  for (let inputId in inputObj) {
    inputObj[inputId].value = "";
  }
};

export function useCreateFormStore(stateOverloads = {}) {
  const _formId = useRef(nanoid(6)).current;
  const _formStore = useRef({
    inputs: {},
    _formId,
    formOptions: { ...defaultFormOptions, ...stateOverloads },
  }).current;

  //form config setup
  useEffect(() => {
    console.log("_FORMSTORE: ", _formStore);
    __FormStateInstances.set(_formId, _formStore);
    _formStore.resetForm = () => resetFormValues(_formStore.inputs);
    return () => {
      __FormStateInstances.delete(_formId);
    };
  }, [_formStore, _formId]);

  //input belongs to this form instance
  const Input = useCallback(createInput(_formStore), [_formStore]);

  return { _formStore, Input, _formId, formOptions: _formStore.formOptions };
}

export function Form(props) {
  console.log("Form comp rendering");
  return <form onSubmit={props.handleSubmit}>{props.children}</form>;
}

function createInput(formStore) {
  return function (props) {
    const [inputState, setInputState] = useState({
      ...defaultInputOptions,
      ...props,
    });
    const [inputValue, setInputValue] = useState(props.initialInputValue || "");

    useEffect(() => {
      console.log("is input uE running >>>>>>");
      //user can run utility fn on change
      const change = function (e) {
        if (props.runOnChange) props.runOnChange(e);
        console.log("in custom change, setter: ", setInputValue);
        setInputState((s) => ({ ...s, value: e.target.value }));
        setInputValue(e.target.value);
      };

      //setup input setter pair
      inputState.onChange = change;
      inputState.value = inputValue;
      console.log("formStore in Input: ", formStore);
      //add new input to form instance
      formStore.inputs[inputState.id] = inputState;
    }, []);

    console.log(
      "input rendered, props, inputState, inputValue: ",
      props,
      inputState,
      inputValue
    );

    return (
      <input
        type={inputState.type}
        id={inputState.id}
        name={inputState.name}
        value={inputValue.value}
        onChange={(e) =>
          setInputState((s) => ({ ...s, value: e.target.value }))
        }
      />
    );
  };
}
