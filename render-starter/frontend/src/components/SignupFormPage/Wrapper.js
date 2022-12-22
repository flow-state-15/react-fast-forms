import React from "react";
import FormProvider from "../../libs/fast-context/FormContext";
import Form from "./Form";

export default function Wrapper() {
	const initialState = {
		email: "",
		emailError: "",
		username: "",
		usernameError: "",
		password: "",
		passwordError: "",
		confirmPassword: "",
		confirmPasswordError: "",
	};
	return (
		<>
			<h1>Sign Up</h1>
			<FormProvider initialState={initialState}>
				<Form initialState={initialState} />
			</FormProvider>
		</>
	);
}
