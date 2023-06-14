import { useEffect, useState } from "react";
import {
  useCreateFormStore,
  defaultInputOptions,
  FormStateInstances,
} from "../state/formState";

// export function useForm(customFormState) {
//   const [formState, setFormState] = useState(null);
//   // create and cleanup state instance
//   useEffect(() => {
//     setFormState(useCreateFormStore(customFormState));
//     return () => {
//       formState.globalInstances.delete(formState.formId);
//     };
//   }, []);

//   return formState;
// }

// make below an actual component that is returned from form's hook and defined in CreateFormStore

export function useFormInput(props) {
  //!! todo: throw error if inputOptions.value is not string

  const [state] = useState({
    ...defaultInputOptions,
    ...props,
  });
  const [inputValue, setInputValue] = useState(props.defaultInputValue || "");

  useEffect(() => {
    //user can run utility fn on change
    const change = (e) => {
      if (props.runOnChange) props.runOnChange(e);
      setInputValue(e.target.value);
    };

    //setup input setter pair
    state.onChange = change;
    state.value = inputValue;

    //add new input to form instance
  }, []);

  return state;
}
