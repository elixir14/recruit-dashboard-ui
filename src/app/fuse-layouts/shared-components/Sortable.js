import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import * as Actions from 'app/store/actions';
import SortCard from './SortCard';

const style = {
	// width: 200,
	// paddingLeft: '5px',
	// border : '1px solid red',
};
const Sortable = props => {
	const dispatch = useDispatch();
	const columns = useSelector(({ fuse }) => fuse.table.columns);

	const [cards, setCards] = useState([]);

	useEffect(() => {
		setCards(columns);
	}, [columns]);

	// useEffect(() => {
	// 	dispatch(Actions.reorderColumns(cards));
	// }, [cards]);

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = cards[dragIndex];
			const temp = update(cards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			});
			setCards(temp);
			dispatch(Actions.reorderColumns(temp));
		},
		[cards, dispatch]
	);
	const renderCard = (card, index) => {
		return <SortCard key={card.id} index={index} id={card.id} text={card.name} moveCard={moveCard} />;
	};

	return (
		<DndProvider backend={Backend}>
			<div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
		</DndProvider>
	);
};

export default Sortable;
