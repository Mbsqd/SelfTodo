import "./styles/Note.css";
import { INoteProps } from "./interfaces/INoteProps";
import { formatDate } from "../../services/formatDate";
import { useEffect, useRef, useState } from "react";
import { deleteNote, updateNoteStatus } from "../../api/notes";

import changeNoteIcon from "../../assets/icons/pen-to-square-regular.svg"
import deleteNoteIcon from "../../assets/icons/trash-solid.svg"
import applyChangeIcon from "../../assets/icons/check-solid.svg"
import cancelChangeIcon from "../../assets/icons/Close.svg"

export function Note(props: INoteProps) {
	const [isComplete, setIsComplete] = useState(props.isCompleted);
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(props.title);
	const [editText, setEditText] = useState(props.text);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleTextChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditText(event.target.value);
		autoResizeTextarea(event.target);
	}

	const autoResizeTextarea = (textarea : HTMLTextAreaElement) => {
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	}

	useEffect(() => {
		if(isEditing && textAreaRef.current) {
			autoResizeTextarea(textAreaRef.current);
		}
	}, [isEditing]);

	const handleStatusChange = async () => {
		try {
			const updateNote = await updateNoteStatus(props.id, { Title: props.title, Text: props.text, IsCompleted: !isComplete });
			if (updateNote && updateNote.isCompleted !== undefined) {
				setIsComplete(updateNote.isCompleted);
			} else {
				console.error("Failed to update note status: Invalid response format");
			}
			console.log(isComplete);
		} catch (error) {
			console.error("Failed to update note status: ", error);
		}
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setEditTitle(props.title);
		setEditText(props.text);
	};

	const handleSaveClick = async () => {
		try {
			const updateNote = await updateNoteStatus(props.id, {Title: editTitle, Text: editText, IsCompleted: isComplete});
			if (updateNote) {
				setIsEditing(false);
				if(props.refreshList) {
					props.refreshList();
				}
			} else {
				console.error("Failed to update note: Invalid response format");
			}
		} catch (error) {
			console.error("Failed to update note: ", error);
		}
	};

	const handleDeleteClick = async () => {
		try {
			await deleteNote(props.id);
			if(props.refreshList) {
				props.refreshList();
			}
		} catch (error) {
			console.error("Failed to delete note ", error);
		}
	}

	return (
		<div className="div__note">
			{isEditing ? (
				<div className="div__edit-note-btn">
					<button className="btn__note-btn" onClick={handleSaveClick}><img src={applyChangeIcon} alt="Save changes" /></button>
					<button className="btn__note-btn" onClick={handleCancelClick}><img src={cancelChangeIcon} alt="Cancel changes" /></button>
				</div>
			) : (
				<div className="div__note-btn">
					<button className="btn__note-btn" id="btn__post-status" onClick={handleStatusChange}>
						{isComplete ? "[*]" : "[ ]"}
					</button>
					<button className="btn__note-btn" onClick={handleEditClick}>
						<img src={changeNoteIcon} alt="Edit note" />
					</button>
					<button className="btn__note-btn" onClick={handleDeleteClick}>
						<img src={deleteNoteIcon} alt="Delete note" />
					</button>
				</div>
			)}
			<div className="text__note-block">
				{isEditing ? (
					<div className="div__edit-note">
						<input className="edit__input-title" type="text" maxLength={45} value={editTitle} onChange={e => setEditTitle(e.target.value)} />
						<textarea className="edit__input-text" maxLength={400} value={editText} onChange={e => {setEditText(e.target.value);handleTextChange(e)}} ref={textAreaRef} />
					</div>
				) : (
					<>
						<h3 className="text__name-note">{props.title}</h3>
						<p className="text__content-note">{props.text}</p>
					</>
				)}
				<div className="div__date">
					<span className="date__note-time">{formatDate(props.dateCreated)}</span>
					<span className="date__note-time">{formatDate(props.dateEnd)}</span>
				</div>
			</div>
		</div>
	);
}
