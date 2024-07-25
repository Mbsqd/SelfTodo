import { useCallback, useEffect, useState } from "react";
import { Note } from "./Note";
import "./styles/NotesList.css";
import { fetchNotes } from "../../api/notes";
import { INote } from "./interfaces/INote";
import { isTokenExpired } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ControlNote } from './ControlNote'

export function NotesList({ refreshFlag }: { refreshFlag: boolean }) {
	const [notes, setNotes] = useState<INote[]>([]);
	const [sortSearch, setSortSearch] = useState("");
	const [sortStatus, setSortStatus] = useState("");
	const navigate = useNavigate();

	const checkTokenAndFetchData = useCallback(async () => {
		const token = localStorage.getItem("token");

		if (token && isTokenExpired(token)) {
			// Токен истек, удаляем токен и перенаправляем пользователя на страницу авторизации
			localStorage.removeItem("token");
			localStorage.removeItem("username");
			navigate("/401");
			return;
		}

		const notesData = await fetchNotes(sortSearch, sortStatus);
		if (notesData && Array.isArray(notesData.notes)) {
			setNotes(notesData.notes);
		} else {
			console.error("Invalid data format: responseData does not contain an array of notes", notesData);
		}
	}, [navigate, sortSearch, sortStatus]);

	useEffect(() => {
		checkTokenAndFetchData();
	}, [checkTokenAndFetchData, refreshFlag]);

	return (
		<div className="div__notes-list">
			<ControlNote
				onSearchChange={setSortSearch}
				onStatusChange={setSortStatus}
			/>
			{notes.map(n => (
				<Note id={n.id} title={n.title} text={n.text} isCompleted={n.isCompleted} dateCreated={n.dateCreated} dateEnd={n.dateEnd} key={n.id} refreshList={checkTokenAndFetchData} />
			))}
		</div>
	);
}
