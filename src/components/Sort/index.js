import React from 'react';
import Button from '../Button';
import './index.css';
import classNames from 'classnames';

const Sort = ({sortKey, activeSortKey, onSort, children}) => {
	const sortClass = classNames(
		'button-inline',
		{'button-active': sortKey === activeSortKey}
	);

	return (
		<div>
			<Button 
				onClick={() => onSort(sortKey)}
				className={sortClass}
			>
				{children} 
			</Button>
		</div>

	);
}

export default Sort;