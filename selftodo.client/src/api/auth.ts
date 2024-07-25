import axios from "axios";

const API_URL = "https://localhost:61994/api/users";

// Функция для логина
export async function login(email: string, password: string) {
	try {
		const response = await axios.post(`${API_URL}/login`, { email, password });
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response) {
			const errorMessage = error.response.data?.message || "Ошибка при авторизации";
			throw new Error(errorMessage);
		} else if (error instanceof Error) {
			throw new Error(error.message || "Ошибка при авторизации");
		} else {
			throw new Error("Ошибка при авторизации");
		}
	}
}

export const isTokenExpired = (token : string) => {
	if (!token) return true;

	const payload = JSON.parse(atob(token.split('.')[1]));
	const expirationDate = payload.exp * 1000;
	return Date.now() > expirationDate;
};

// Функция для регистрации
export const register = async (Username: string, Email: string, Password: string) => {
	try {
		const response = await axios.post(`${API_URL}/register`, { Username, Email, Password });
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response) {
			const errorMessage = error.response.data?.message || "Ошибка при регистрации";
			throw new Error(errorMessage);
		} else if (error instanceof Error) {
			throw new Error(error.message || "Ошибка при регистрации");
		} else {
			throw new Error("Ошибка при регистрации");
		}
	}
};
