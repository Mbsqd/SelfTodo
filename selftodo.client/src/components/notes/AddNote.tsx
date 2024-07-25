import { useEffect, useRef, useState } from "react";
import "./styles/AddNote.css";
import { createNote } from "../../api/notes";

import addIcon from "../../assets/icons/Plus_add.svg";
import clearIcon from "../../assets/icons/Close.svg";

export function AddNote({ onNoteAdded }: { onNoteAdded: () => void }) {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [dateEnd, setDateEnd] = useState("");
	const [error, setError] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
		autoResizeTextarea(e.target);
	};

	useEffect(() => {
		if (textAreaRef.current) {
			autoResizeTextarea(textAreaRef.current);
		}
	}, [text]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (title && text && dateEnd) {
			try {
				const newNote = await createNote({ title, text, dateEnd: new Date(dateEnd).toISOString() });
				if (newNote) {
					onNoteAdded();
					clearForm();
				} else {
					console.error("Failed to create note");
				}
			} catch (error) {
				console.error("Error creating note: ", error);
			}
		} else {
			setError(true);
		}
	};

	const clearForm = () => {
		setTitle("");
		setText("");
		setDateEnd("");
		setError(false);
	};

	return (
		<div className="div__add-note">
			<form className="form__add-note" action="" method="post">
				<div className="div__new-note">
					<input id="input__name_note" type="text" placeholder="Note name" maxLength={45} value={title} onChange={e => setTitle(e.target.value)} />
					<textarea
						id="textarea__new-note"
						maxLength={400}
						placeholder="Enter your note here..."
						value={text}
						onChange={e => {setText(e.target.value);handleTextChange}}
						ref={textAreaRef}
					></textarea>
					{error ? (
						<div className="div__error-text">
							<p className="span__error-text">Please fill in all fields</p>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className="menu__new-note">
					<button className="btn_new-note" type="submit" onClick={handleSubmit}>
						<img src={addIcon} alt="Add note" />
					</button>
					<input className="datetime_new-note" type="datetime-local" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
					<button className="btn_new-note" id="btn__clear-form" type="reset" onClick={clearForm}>
						<img src={clearIcon} alt="Clear text" />
					</button>
				</div>
			</form>
		</div>
	);
}
