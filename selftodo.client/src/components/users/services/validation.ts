export const validateEmail = (email: string): string => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (!re.test(String(email).toLowerCase())) {
        return "Incorrect email"
    }
    return ""
}

export const validatePassword = (password: string): string => {
    if (password.length <= 6) {
        return "Password must be more than 6 characters"
    }
    return ""
}

export const validateLogin = (login: string): string => {
    if (login.length <= 0) {
        return "Username is required"
    } else if (login.length >= 32) {
        return "Username must be less than 32 characters"
    }
    return ""
}

export const validatePasswordConfirmation = (password: string, confirmPassword: string): string => {
    if (password !== confirmPassword) {
        return "Passwords do not match"
    }
    return ""
}

export const initialEmailError = "Email can't be empty"
export const initialPasswordError = "Password can't be empty"
export const initialLoginError = "Login can't be empty"
export const initialConfirmPasswordError = "Password confirmation can't be empty"