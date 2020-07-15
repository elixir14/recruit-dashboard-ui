export const REORDER_COLUMNS = '[TABLE] REORDER COLUMNS';

export function reorderColumns(columns) {
	return {
		type: REORDER_COLUMNS,
		payload: columns
	};
}
