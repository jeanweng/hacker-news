import React, { Component } from 'react';
import Counter from './Counter';

class CounterPanel extends Component{

	render(){
		return (
			<div>
				<Counter value={1} />
			</div>
		);
	}
}

export default CounterPanel;