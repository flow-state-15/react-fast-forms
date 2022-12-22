import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import FormProvider, {
	useFormContext,
} from "../../libs/fast-context/FormContext";
import Form from "./Form";
import "./SignupForm.css";

export default function Wrapper(props) {
	const dispatch = useDispatch();
	const { getStore, dispatch: formDispatch } = useFormContext();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formValue = getStore();
		if (formValue.password !== formValue.confirmPassword) {
			return setErrors([
				"Passwords don't match",
			]);
		}
		setErrors([]);
		const send = {
			email: formValue.email.data,
			username: formValue.username.data,
			password: formValue.password.data,
		};
		dispatch(sessionActions.signup(send))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<>
			<h1>Sign Up</h1>
			<FormProvider
				initialState={{
					email: { data: "", error: "" },
					username: { data: "", error: "" },
					password: { data: "", error: "" },
					confirmPassword: { data: "", error: "" },
				}}
			>
				<Form onSubmit={handleSubmit} />
			</FormProvider>
		</>
	);
}
