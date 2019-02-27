import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

const Button = ({onClick, className, children}) =>
	<button className="button-inline button-active"
		onClick={onClick}
		className={className}
		type="button"
	>
	  {children}
	</button>

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

Button.defaultProps = {
	className: ''
}

export default Button;