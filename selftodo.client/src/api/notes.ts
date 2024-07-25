import axios from "axios";

const API_URL = "https://localhost:61994/api/notes";

export const fetchNotes = async (sortSearch : string, sortStatus : string) => {
	try {
		const token = localStorage.getItem("token");
		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await axios.get(API_URL, { headers, params: {SortSearch : sortSearch, SortStatus : sortStatus} });
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createNote = async (note : {title : string, text : string, dateEnd : string}) => {
	try {
		const token = localStorage.getItem("token");
		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await axios.post(API_URL, note, { headers });
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export const updateNoteStatus = async (id: number, updateData: {
	Title: string,
	Text: string,
	IsCompleted: boolean
	}) => {
		try {
			const token = localStorage.getItem("token");
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const response = await axios.put(`${API_URL}/${id}`, updateData, { headers });
			console.log("Server response:", response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

export const deleteNote = async (id: number) => {
	try {
		const token = localStorage.getItem("token");
		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await axios.delete(`${API_URL}/${id}`, { headers });
			
		console.log("Server response:", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}