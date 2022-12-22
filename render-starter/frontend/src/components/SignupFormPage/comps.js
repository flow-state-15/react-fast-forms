import { useStore as useFormStore } from "../../libs/fast-context/FormContext";

const InputField = (props) => {
	const [data, dispatch] = useFormStore((store) => store[props.value]);
	// todo track your renders:
	// console.log('inputfield ' + value.italics() + ' rendering')
    // console.log("inputfield, data: ", data)
	return (
		<input
			{...props}
			value={data}
			onChange={(e) => dispatch({ [props.value]: e.target.value })}
		/>
	);
};

const ErrorDisplay = ({ error }) => {
	const [errorData] = useFormStore((store) => store[error]);
    // console.log("error: ", error)
	return <span>{errorData}</span>;
};

export const TextInput = (props) => {
	return (
		<div className="text-input">
			<label htmlFor={props.id || `input-${props.value}`}>
				{props.value}
			</label>
			<InputField {...props} />
			<ErrorDisplay error={props.error} />
		</div>
	);
};
