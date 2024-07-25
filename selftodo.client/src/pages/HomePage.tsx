import { useCallback, useState } from "react";
import { AddNote } from "../components/notes/AddNote";
import { NotesList } from "../components/notes/NotesList";
import { Layout } from "./Layout";
import "./styles/HomePage.css";

function HomePage() {
	const [refreshFlag, setRefreshFlag] = useState(false);
	const refreshNotes = useCallback(() => {
		setRefreshFlag(prev => !prev);
	}, []);

	return (
		<Layout>
			<AddNote onNoteAdded={refreshNotes} />
			<hr id="divide-line" />
			<NotesList refreshFlag={refreshFlag} />
		</Layout>
	);
}

export default HomePage;
