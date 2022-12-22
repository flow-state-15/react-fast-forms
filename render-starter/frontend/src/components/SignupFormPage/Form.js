import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { TextInput } from "./comps";
import "./SignupForm.css";

function Form(props) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<TextInput id="email" type="text" value="email" required />
				<label>
					Username
					<input
						type="text"
						value="email"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<TextInput id="username" type="text" value="username" required />
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<TextInput id="password" type="text" value="password" required />
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<TextInput id="confirm" type="text" value="confirm" required />
				<button type="button">Cancel</button>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default Form;
