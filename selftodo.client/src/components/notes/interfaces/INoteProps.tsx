export interface INoteProps {
	id: number;
	title: string;
	text: string;
	isCompleted: boolean;
	dateCreated: string,
	dateEnd: string;
	refreshList?: () => void;
}
