import React from "react";
import FormProvider, {
	useStore as useFormStore,
} from "./context/FormContext.js";

const InputField = (props) => {
	const [storeValue, dispatch] = useFormStore((store) => store[props.value]);
	// todo track your renders:
	// console.log('inputfield ' + value.italics() + ' rendering')
	return (
		<input
			{...props}
			value={storeValue}
			onChange={(e) => dispatch({ [props.value]: e.target.value })}
		/>
	);
};

const TextInput = ({ value }) => {
	return (
		<div className="field">
			{value}: <InputField value={value} />
		</div>
	);
};

const DisplayData = ({ value }) => {
	const [storeValue] = useFormStore((store) => store[value]);
	// todo track your renders:
	// console.log('displaydata ' + value.italics() + ' rendering')
	return <>{storeValue}</>;
};

const Display = ({ value }) => {
	return (
		<div className="value">
			{value}: <DisplayData value={value} />
		</div>
	);
};

const FormContainer = () => {
	return (
		<div className="container">
			<h5>FormContainer</h5>
			<TextInput value="first" />
			<TextInput value="last" />
		</div>
	);
};

const DisplayContainer = () => {
	return (
		<div className="container">
			<h5>DisplayContainer</h5>
			<Display value="first" />
			<Display value="last" />
		</div>
	);
};

const ContentContainer = () => {
	return (
		<div className="container">
			<h5>ContentContainer</h5>
			<FormContainer />
			<DisplayContainer />
		</div>
	);
};

function App() {
	return (
		<FormProvider>
			<div className="container">
				<h5>App</h5>
				<ContentContainer />
			</div>
		</FormProvider>
	);
}

export default App;
