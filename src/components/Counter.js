import React, { Component } from 'react';

class Counter extends Component{
	constructor(props){
		super(props);
		this.state={
			value: this.props.value
		}
		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleDecrement = this.handleDecrement.bind(this);
	}
	
	handleIncrement(){
		this.updateCount(true);
	}
	handleDecrement(){	
		this.updateCount(false);
	}

	updateCount(isIncrement){
		const count = this.state.value;
		const newCount = isIncrement? count + 1 : count - 1;
		this.setState({
			value: newCount
		});
	}

	render(){
		return (
			<div>
				<button onClick={this.handleIncrement}> + </button>
				<button onClick={this.handleDecrement}> - </button>
				<span> {this.state.value} </span>
			</div>
		);
	}
};

export default Counter;