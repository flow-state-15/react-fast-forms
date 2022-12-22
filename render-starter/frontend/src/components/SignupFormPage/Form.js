import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useFormContext } from "../../libs/fast-context/FormContext";
import { TextInput } from "./comps";

function Form({ initialState }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const { getState, dispatch: formDispatch } = useFormContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formValue = getState();

		console.log("submitted: ", formValue);

		if (formValue.password !== formValue.confirmPassword) {
			return formDispatch({
				passwordError: "Passwords must match",
				confirmPasswordError: "Passwords must match"
			});
		}

    reset()

		const send = {
			email: formValue.email,
			username: formValue.username,
			password: formValue.password,
		};

		dispatch(sessionActions.signup(send))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				handleErrors(data.errors);
			});
	};

	const handleErrors = (errors) => {
		const state = getState();
		const formFields = Object.keys(state);
		errors.forEach((e) => {
			formFields.forEach((f) => {
				if (e.toLowerCase().includes(f.toLowerCase()))
					formDispatch({ [`${f}Error`]: e });
			});
		});
	};

  const reset = () => formDispatch(initialState)

	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextInput
					id="email"
					type="text"
					value="email"
					error="emailError"
					required
				/>
				<TextInput
					id="username"
					type="text"
					value="username"
					error="usernameError"
					required
				/>
				<TextInput
					id="password"
					type="text"
					value="password"
					error="passwordError"
					required
				/>
				<TextInput
					id="confirm"
					type="text"
					value="confirmPassword"
					error="confirmPasswordError"
					required
				/>
				<button type="button">Cancel</button>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default Form;
