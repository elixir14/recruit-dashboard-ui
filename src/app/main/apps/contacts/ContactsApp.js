import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function ContactsApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getContacts());
		dispatch(Actions.getUserData());
		dispatch(Actions.getTags());
	}, [dispatch]);

	// useEffect(() => {
	// 	dispatch(Actions.getContacts(props.match.params));
	// }, [dispatch, props.match.params]);

	return (
		<>
			<FusePageCarded
				header={<ContactsHeader pageLayout={pageLayout} />}
				content={<ContactsList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}

export default withReducer('contactsApp', reducer)(ContactsApp);
