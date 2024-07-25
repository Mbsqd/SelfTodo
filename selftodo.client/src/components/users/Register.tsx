import { useEffect, useState } from 'react'
import { validateEmail, validatePassword, validateLogin, validatePasswordConfirmation, initialEmailError, initialPasswordError, initialLoginError, initialConfirmPasswordError } from './services/validation'

import './styles/Register.css'
import { register } from '../../api/auth'

export function Register() {
	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [loginDirty, setLoginDirty] = useState(false)
    const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)

    const [emailError, setEmailError] = useState(initialEmailError)
    const [passwordError, setPasswordError] = useState(initialPasswordError)
    const [loginError, setLoginError] = useState(initialLoginError)
    const [confirmPasswordError, setConfirmPasswordError] = useState(initialConfirmPasswordError)

    const [formValid, setFormValid] = useState(false)
    const [error, setError] = useState('');

	useEffect(() => {
        if (emailError || passwordError || loginError || confirmPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, loginError, confirmPasswordError])

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setEmailError(validateEmail(e.target.value))
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordError(validatePassword(e.target.value))
        setConfirmPasswordError(validatePasswordConfirmation(e.target.value, confirmPassword))
    }

    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        setLoginError(validateLogin(e.target.value))
    }

    const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
        setConfirmPasswordError(validatePasswordConfirmation(password, e.target.value))
    }

    const blurHandel = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
            case "login":
                setLoginDirty(true)
                break
            case "confirmPassword":
                setConfirmPasswordDirty(true)
                break
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await register(login, email, password);
            alert('Registration successful');
            // Очистка формы после успешной регистрации
            setEmail('');
            setPassword('');
            setLogin('');
            setConfirmPassword('');
            
            setEmailDirty(false);
            setPasswordDirty(false);
            setLoginDirty(false);
            setConfirmPasswordDirty(false);

            setEmailError(initialEmailError);
            setPasswordError(initialPasswordError);
            setLoginError(initialLoginError);
            setConfirmPasswordError(initialConfirmPasswordError);
            
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Registration failed');
            }
        }
    };

	return (
		<div className="auth-form registration">
			<h2 className="auth__header-text">Registration</h2>
			<div className="form__div">
				<form className="form__class" onSubmit={handleSubmit}>
					<label className="form__label" htmlFor="reg-username">Username</label>
					<input className="form__input-area" type="text" name="login" value={login} onBlur={e => blurHandel(e)} onChange={e => loginHandler(e)}/>
					{(loginDirty && loginError) && <div className="text__error-reg">{loginError}</div>}

					<label className="form__label" htmlFor="reg-email">Email</label>
					<input className="form__input-area" name="email" type="email" value={email} onBlur={e => blurHandel(e)} onChange={e => emailHandler(e)}/>
					{(emailDirty && emailError) && <div className="text__error-reg">{emailError}</div>}

					<label className="form__label" htmlFor="reg-password">Password</label>
					<input className="form__input-area" name="password" type="password" value={password} onBlur={e => blurHandel(e)} onChange={e => passwordHandler(e)}/>
					{(passwordDirty && passwordError) && <div className="text__error-reg">{passwordError}</div>}

					<label className="form__label" htmlFor="reg-confirm-password">Confirm password</label>
					<input className="form__input-area" name="confirmPassword" type="password" value={confirmPassword} onBlur={e => blurHandel(e)} onChange={e => confirmPasswordHandler(e)}/>
					{(confirmPasswordDirty && confirmPasswordError) && <div className="text__error-reg">{confirmPasswordError}</div>}
					
                    {error && <div className="register-error">{error}</div>}
					<button disabled={!formValid} className="form__send-btn" type="submit">Register</button>
				</form>
			</div>
		</div>
	);
}