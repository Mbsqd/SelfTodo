export interface INote {
	id: number;
	title: string;
	text: string;
	isCompleted: boolean;
	dateCreated: string,
	dateEnd: string;
	refreshList?: () => void;
}
