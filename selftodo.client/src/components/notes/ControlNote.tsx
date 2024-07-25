import './styles/ControlNote.css'
import { ControlNoteProps } from './interfaces/ControlNoteProps'

export function ControlNote({onSearchChange, onStatusChange} : ControlNoteProps) {
	const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
		onSearchChange(event.target.value);
	};

	const handleStatusChange = (status: string) => {
		onStatusChange(status);
	}

	return (
		<div className="div__control-post">
			<div className="div__view-control">
				<button className="btn__view-control" type="button" onClick={() => {handleStatusChange("")}}>All</button>
				<button className="btn__view-control" type="button" onClick={() => {handleStatusChange("active")}}>Active</button>
				<button className="btn__view-control" type="button" onClick={() => {handleStatusChange("done")}}>Done</button>
			</div>
		<div className="div__search-post">
			<input className="input__search-note" type="text" maxLength={45} placeholder="Search..." onChange={handleSearch} />
		</div>
	</div>
	);
}