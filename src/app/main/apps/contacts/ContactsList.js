import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Grid,
	Table,
	TableHeaderRow,
	TableFilterRow,
	PagingPanel,
	TableSelection,
	DragDropProvider,
	TableColumnReordering,
	TableRowDetail,
	TableEditColumn
} from '@devexpress/dx-react-grid-material-ui';
import {
	FilteringState,
	IntegratedFiltering,
	SortingState,
	IntegratedSorting,
	PagingState,
	IntegratedPaging,
	SelectionState,
	IntegratedSelection,
	RowDetailState,
	EditingState,
	DataTypeProvider
} from '@devexpress/dx-react-grid';
import * as MainActions from 'app/store/actions';
import ContactTag from './ContactsTag';

// const RowDetail = ({ row, columns }) => (
// 	// /row = row.filter(newRow=> [].i8ncludes(row.indexOf(newRow)))
// 	<div className="border-1">
// 		<div className="flex border-1">
// 			{columns.map((item, index) => {
// 				return (
// 					<div className="w-1/4 p-4 flex-col" key={index}>
// 						<div className="font-bold">{item.title}</div> <div>{row[item.name]}</div>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	</div>
// );

const RowDetail = ({ row, columns }) => (
	// /row = row.filter(newRow=> [].i8ncludes(row.indexOf(newRow)))
	<div className="border-1">
		<div className="flex flex-wrap">
			{columns.map((item, index) => {
				return item.display ? (
					<div className="w-1/4 p-4 flex-col border-1" key={index}>
						{item.name === 'tags' ? (
							<>
								<div className="font-bold">Tags</div>
								<ContactTag row={row} />
							</>
						) : (
							<>
								<div className="font-bold">{item.title}</div>
								<div>{row[item.name]}</div>
							</>
						)}
					</div>
				) : (
					''
				);
			})}
		</div>
	</div>
);

// const TagsFormatter = ({ row }) => {
// 	<ContactTag />;
// };
function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);

	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);

	const columns = useSelector(({ fuse }) => fuse.table.columns);
	const [filteredData, setFilteredData] = useState(null);
	// console.log(filterColumn)
	const [pageSizes] = useState([10, 20, 50, 100]);
	const [selection, setSelection] = useState([]);

	const [columnOrder, setColumnOrder] = useState([]);
	const [tagsColumn] = useState(['tags']);

	useEffect(() => {
		const temp = columns.map(item => {
			return item.name;
		});
		setColumnOrder(temp);
	}, [columns]);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	const updateOrder = nextOrder => {
		const temp = [];
		nextOrder.forEach((item, index) => {
			columns.forEach(subItem => {
				if (subItem.name === item)
					temp.push({
						id: index,
						name: item,
						title: subItem.title
					});
			});
		});
		setColumnOrder(nextOrder);
		dispatch(MainActions.reorderColumns(temp));
	};
	if (!filteredData) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<CircularProgress />
			</div>
		);
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no contacts!
				</Typography>
			</div>
		);
	}
	const DeleteButton = ({ onExecute }) => (
		<IconButton
			onClick={() => {
				// eslint-disable-next-line
				if (window.confirm('Are you sure you want to delete this row?')) {
					onExecute();
				}
			}}
			title="Delete row"
		>
			<Icon>delete</Icon>
		</IconButton>
	);
	const EditButton = ({ onExecute }) => (
		<IconButton onClick={onExecute} title="Edit row">
			<Icon>star_border</Icon>
		</IconButton>
	);
	const StarButton = ({ onExecute }) => (
		<IconButton onClick={onExecute} title="Edit row">
			<Icon>star_border</Icon>
		</IconButton>
	);
	const commandComponents = {
		// add: AddButton,
		edit: EditButton,
		delete: DeleteButton,
		star: StarButton
		// commit: CommitButton,
		// cancel: CancelButton,
	};
	const Command = ({ id, onExecute }) => {
		const CommandButton = commandComponents[id];
		return <CommandButton onExecute={onExecute} />;
	};
	const deleteRows = deletedIds => {
		const rows = filteredData;
		const rowsForDelete = rows.slice();
		deletedIds.forEach(rowId => {
			rowsForDelete.splice(rowId, 1);
		});
		return rowsForDelete;
	};
	const commitChanges = ({ added, changed, deleted }) => {
		let changedRows;
		const rows = filteredData;
		if (added) {
			const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
			changedRows = [
				...rows,
				...added.map((row, index) => ({
					id: startingAddedId + index,
					...row
				}))
			];
		}
		if (changed) {
			changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
		}
		if (deleted) {
			changedRows = deleteRows(deleted);
		}
		// setRows(changedRows);
		setFilteredData(changedRows);
	};
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<Grid rows={filteredData} columns={columns.slice(0, 6)}>
				<DataTypeProvider for={tagsColumn} formatterComponent={({ row }) => <ContactTag row={row} />} />
				<SelectionState selection={selection} onSelectionChange={setSelection} />
				<FilteringState defaultFilters={[]} />
				<IntegratedFiltering />
				<SortingState />
				<IntegratedSorting />
				<PagingState defaultCurrentPage={0} defaultPageSize={10} />
				<IntegratedPaging />
				<IntegratedSelection />
				<DragDropProvider />
				<RowDetailState />
				<Table />
				<TableColumnReordering
					order={columnOrder}
					onOrderChange={nextOrder => {
						updateOrder(nextOrder);
					}}
				/>
				<TableHeaderRow showSortingControls />
				<TableFilterRow />
				<TableSelection showSelectAll />
				<TableRowDetail contentComponent={({ row }) => <RowDetail row={row} columns={columns.slice(6)} />} />
				<EditingState onCommitChanges={commitChanges} />
				<TableEditColumn width={100} showDeleteCommand showEditCommand commandComponent={Command} />
				<PagingPanel pageSizes={pageSizes} />
			</Grid>
		</FuseAnimate>
	);
}

export default ContactsList;
