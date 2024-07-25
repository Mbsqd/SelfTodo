import { useEffect, useState } from "react";
import { validateEmail, validatePassword, initialEmailError, initialPasswordError } from "./services/validation";
import { login } from "../../api/auth";
import "./styles/Login.css";
import { Navigate } from "react-router-dom";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);

	const [emailError, setEmailError] = useState(initialEmailError);
	const [passwordError, setPasswordError] = useState(initialPasswordError);

	const [formValid, setFormValid] = useState(false);

	const [error, setError] = useState("");
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [emailError, passwordError]);

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setEmailError(validateEmail(e.target.value));
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setPasswordError(validatePassword(e.target.value));
	};

	const blurHandel = (e: React.FocusEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case "email":
				setEmailDirty(true);
				break;
			case "password":
				setPasswordDirty(true);
				break;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		try {
			const data = await login(email, password);
			localStorage.setItem("token", data.token);
			localStorage.setItem("username", data.username)
			setRedirect(true);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message); // Устанавливаем сообщение об ошибке в состояние
			} else {
				setError("Произошла неизвестная ошибка");
			}
		}
	};

	if (redirect) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="auth-form login">
			<h2 className="auth__header-text">Login</h2>
			<form className="form__class" onSubmit={handleSubmit}>
				<label className="form__label" htmlFor="login-email">
					Email
				</label>
				<input className="form__input-area" name="email" type="email" value={email} onBlur={e => blurHandel(e)} onChange={e => emailHandler(e)} />
				{emailDirty && emailError && <div className="text__error-log">{emailError}</div>}

				<label className="form__label" htmlFor="login-password">
					Password
				</label>
				<input
					className="form__input-area"
					name="password"
					type="password"
					value={password}
					onBlur={e => blurHandel(e)}
					onChange={e => passwordHandler(e)}
				/>
				{passwordDirty && passwordError && <div className="text__error-log">{passwordError}</div>}

				{error && <div className="login-error">{error}</div>}
				<button disabled={!formValid} className="form__send-btn" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}
