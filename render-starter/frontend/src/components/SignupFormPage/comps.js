
import { useStore as useFormStore } from "../../libs/fast-context/FormContext";

const InputField = (props) => {
	const [slice, dispatch] = useFormStore((store) => store[props.value]);
    // todo track your renders:
	// console.log('inputfield ' + value.italics() + ' rendering')
	return (
        <input
        {...props}
        value={slice.data}
        onChange={(e) => dispatch({ [props.value]: e.target.value })}
		/>
        );
    };
    
const ErrorDisplay = ({ value }) => {
    const [error] = useFormStore((store) => store[value].error);
    return (
        <span>{error}</span>
    )
}

export const TextInput = (props) => {
	return (
		<div className="text-input">
            <label htmlFor={props.id || `input-${props.value}`}>{props.value}</label>
			<InputField {...props} />
            <ErrorDisplay value={props.value} />
		</div>
	);
};