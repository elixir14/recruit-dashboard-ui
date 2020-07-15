import * as Actions from 'app/store/actions/fuse';

const initialState = {
	columns: [
		{
			id: 1,
			name: 'uid',
			title: 'UId',
			display: false
		},
		{
			id: 2,
			name: 'password',
			title: 'Password',
			display: false
		},
		{
			id: 3,
			name: 'email',
			title: 'Email',
			display: true
		},
		{
			id: 4,
			name: 'first_name',
			title: 'First Name',
			display: true
		},
		{
			id: 5,
			name: 'last_name',
			title: 'Last Name',
			display: true
		},
		{
			id: 6,
			name: 'tags',
			title: 'Tags',
			display: true
		},
		{
			id: 7,
			name: 'contact_no',
			title: 'Contact No',
			display: true
		},
		{
			id: 8,
			name: 'gid',
			title: 'Gid',
			display: false
		},
		{
			id: 9,
			name: 'quids',
			title: 'Quids',
			display: false
		},
		{
			id: 10,
			name: 'su',
			title: 'Su',
			display: false
		},
		{
			id: 11,
			name: 'subscription_expired',
			title: 'Subscription Expired',
			display: true
		},
		{
			id: 12,
			name: 'verify_code',
			title: 'Verify Code',
			display: false
		},
		{
			id: 13,
			name: 'dob',
			title: 'DOB',
			display: true
		},
		{
			id: 14,
			name: 'city',
			title: 'City',
			display: true
		},
		{
			id: 15,
			name: 'country',
			title: 'Country',
			display: true
		},
		{
			id: 16,
			name: 'state',
			title: 'State',
			display: true
		},
		{
			id: 17,
			name: 'job_location',
			title: 'Job Location',
			display: true
		},
		{
			id: 18,
			name: 'post',
			title: 'Post',
			display: true
		},
		{
			id: 19,
			name: 'attachment',
			title: 'Attachment',
			display: false
		},
		{
			id: 20,
			name: 'education',
			title: 'Education',
			display: true
		},
		{
			id: 21,
			name: 'experienced',
			title: 'Experienced',
			display: true
		},
		{
			id: 22,
			name: 'date',
			title: 'Date',
			display: true
		},
		{
			id: 23,
			name: 'udate',
			title: 'Udate',
			display: false
		},
		{
			id: 24,
			name: 'mail_sent',
			title: 'Mail Sent',
			display: false
		},
		{
			id: 25,
			name: 'favorite',
			title: 'Favorite',
			display: true
		},
		{
			id: 26,
			name: 'note',
			title: 'Note',
			display: false
		}
	]
};

const table = (state = initialState, action) => {
	switch (action.type) {
		case Actions.REORDER_COLUMNS: {
			return {
				...state,
				columns: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default table;
