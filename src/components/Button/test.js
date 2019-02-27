import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';

Enzyme.configure({adapter: new Adapter()});

describe('Button', ()=> {
	it('renders without crashing', () => {
  		const div = document.createElement('div');
  		ReactDOM.render(<Button>Give me more</Button>, div);
  	//ReactDOM.unmountComponentAtNode(div);
	});

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Button>Give me more</Button>
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('shows Button with type button', () => {
		const element = shallow(
			<div>
				<Button className="haha">Give me more</Button>
				<Button className="haha">Give me more</Button>
			</div>
		);
		expect(element.find('.haha').length).toBe(2);
	});
})
