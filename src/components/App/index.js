import React, { Component } from 'react';
import Search from '../Search';
import Table from '../Table';
import Button from '../Button';
import * as ADDRESS from '../constants';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner);

const Loading = () => 
	<FontAwesomeIcon className="icon" icon='spinner' />

const withLoading = (Component) => ({isLoading, ...rest}) =>
	isLoading
		? <Loading/>
		: <Component {...rest} />

const ButtonWithLoading = withLoading(Button);

const {
	DEFAULT_QUERY,
	DEFAULT_HPP,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_SEARCH,
	PARAM_PAGE,
	PARAM_HPP
} = ADDRESS;

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
	const {searchKey, results} = prevState;
	const oldHits = results && results[searchKey] 
		? results[searchKey].hits
		: [];
	const updateHits = [...oldHits, ...hits];
	return {
		results: {
			...results, 
			[searchKey]: {hits: updateHits, page}
		},
		isLoading: false
	};
}

const updateDismiss = (id) => (prevState) => {
	const {searchKey, results} = prevState;
	const {hits, page} = results[searchKey];
	const updatedHits = hits.filter(item => item.objectID !== id);
	return {results: {...results, [searchKey]: {hits: updatedHits, page}}};
}

const updateSearchSubmit = () => (prevState) =>{
	const { searchTerm } = prevState;
	return { searchKey: searchTerm };
}

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			results: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: null,
			isLoading: false
		}

		this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
		this.setSearchTopStories = this.setSearchTopStories.bind(this);
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	needsToSearchTopStories(searchTerm){
		return !this.state.results[searchTerm];
	}

	setSearchTopStories(result){
		const {hits, page} = result;
		this.setState(updateSearchTopStoriesState(hits, page));
	}

	fetchSearchTopStories(searchTerm, page = 0){
		this.setState({isLoading: true});
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
		.then(response => response.json())
		.then(result => this.setSearchTopStories(result))
		.catch(e => this.setState({error: e}));
	}

	onSearchSubmit(event){
		this.setState(updateSearchSubmit());
		
		if(this.needsToSearchTopStories(this.state.searchTerm)){
			this.fetchSearchTopStories(this.state.searchTerm);
		}
		event.preventDefault();
	}

	componentDidMount(){
		const { searchTerm } = this.state;
		this.setState({searchKey: searchTerm});
		this.fetchSearchTopStories(searchTerm);
	}

	onDismiss(id){
		this.setState(updateDismiss(id));
	}

	onSearchChange(event){
		this.setState({
			searchTerm : event.target.value
		})
	}

	render() {
		const {searchTerm, results, searchKey, error, isLoading} = this.state;
		const page = (
			results && 
			results[searchKey] &&
			results[searchKey].page) || 0;
		const list = (
			results &&
			results[searchKey] &&
			results[searchKey].hits) || [];

	    return (
	    	<div className="page">
		        <div className="interactions">
			      	<Search
			      		value={searchTerm}
			      		onChange={this.onSearchChange}
			      		onSubmit={this.onSearchSubmit}
			      	>
			      		Search
			      	</Search>
		      	</div>
		      	{error
		      	  ?	<div className="interactions">
		      			<p>Something went wrong.</p>
		      		</div>
		      	  : <Table
			      		list={list}
			      		onDismiss={this.onDismiss}
		      		/>
		      	}
	      	    <div className="interactions">
	      	    	<ButtonWithLoading
		      	    	isLoading={isLoading}
		      	    	onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
		      	  	  	More
	      	  		</ButtonWithLoading>
	      	  	</div>
      	  	</div>
	    );
	}
}

export default App;