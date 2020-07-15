import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Icon } from '@material-ui/core';

const ItemTypes = {
	CARD: 'card'
};

const style = {
	padding: '.75rem 2.5rem',
	paddingTop: '1.3rem',
	marginBottom: '.5rem',
	backgroundColor: '#61dafb',
	borderRadius: '20px 0px 0px 20px',
	cursor: 'move'
};
const SortCard = ({ id, text, index, moveCard }) => {
	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		}
	});
	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.CARD, id, index },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<div ref={ref} style={{ ...style, opacity }}>
			<Icon>drag_indicator</Icon>
			<div className="float-right" style={{width:'86%',paddingTop:'.3rem'}}>{text.charAt(0).toUpperCase() + text.slice(1)}</div>
		</div>
	);
};
export default SortCard;
