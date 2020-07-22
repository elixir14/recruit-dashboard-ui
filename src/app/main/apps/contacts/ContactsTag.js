import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import Tooltip from '@material-ui/core/Tooltip';
import TodoChip from '../todo/TodoChip';
import * as Actions from './store/actions';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 10px'
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	icon: {
		display: 'flex',
		cursor: 'pointer'
	},
	chip: {},
	noLabel: {
		marginTop: theme.spacing(3)
	}
}));

const DialogContent = withStyles(() => ({
	root: {
		minWidth: '400px',
		minHeight: '200px',
		overflowY: 'hidden'
	}
}))(MuiDialogContent);

export default function ContactTag({ row }) {
	const classes = useStyles();
	const availableTags = useSelector(({ contactsApp }) => contactsApp.contacts.tags);
	const colors = useSelector(({ contactsApp }) => contactsApp.contacts.colors);
	const [selectedTags, setSelectedTags] = useState([]);
	const [newTags, setNewTags] = useState([]);
	const dispatch = useDispatch();

	// const handleChange = event => {
	// 	setUserTag(event.target.value);
	// 	console.log(userTag);
	// };
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setNewTags([]);
		setSelectedTags([]);
		setOpen(false);
	};
	const handleClose = async () => {
		const ids = [];
		setOpen(false);
		dispatch({ type: Actions.SAVE_CANDIDATE_TAGS, tags: [...selectedTags], uid: row.uid });
		if (newTags.length > 0) {
			await axios
				.post(`${BACKEND_URL}/api/tags`, newTags, {
					Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`
				})
				.then(response => {
					response.data.forEach(item => {
						ids.push(item.id);
					});
					dispatch({
						type: Actions.ADD_TAGS,
						payload: response.data
					});
				});
		}
		selectedTags.forEach(item => {
			if (item.id) {
				ids.push(item.id);
			}
		});
		await axios.post(
			`${BACKEND_URL}/api/candidate/tag`,
			{
				candidate_id: row.uid,
				tags: ids
			},
			{
				Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`
			}
		);
		setNewTags([]);
		setSelectedTags([]);
	};

	const handleChange = (newValue, actionMeta) => {
		const t = [];
		const n = [];
		newValue.forEach(item => {
			let i = item;
			if (i.__isNew__) {
				i = {
					...i,
					color: FuseUtils.generateRandomColor(colors)
				};
				n.push(i);
			}
			t.push(i);
		});
		setSelectedTags(t);
		if (n.length > 0) setNewTags(n);
		// if(newValue.__is_new)
	};
	return (
		<>
			<div className={classes.container}>
				<div className={`${classes.chips}`} style={{ backgroundColor: 'white' }}>
					{row.tags.map(value => (
						<TodoChip title={value} key={value.id} color={value.color} />
					))}
				</div>
				<div className={classes.icon}>
					<Tooltip title="Add/Remove tags" arrow placement="top">
						<Icon color="secondary" onClick={handleClickOpen}>
							add_circle
						</Icon>
					</Tooltip>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add or Remove tags</DialogTitle>
				<DialogContent>
					<CreatableSelect
						isClearable
						isMulti
						onChange={handleChange}
						defaultValue={row.tags}
						// onInputChange={this.handleInputChange}
						options={availableTags}
					/>
					{/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
