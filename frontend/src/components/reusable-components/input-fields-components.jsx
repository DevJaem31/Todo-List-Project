import React from 'react';
import { PropTypes } from 'prop-types';

function InputField({ label, type, placeholder, value, onChange, onFocus, name }) {
	return (
		<div className='input-field-container flex flex-col gap-2'>
			<label
				className='text-sm tracking-widest font-bold pl-1.5 tracking-widest'
				htmlFor='email'
			>
				{label}
			</label>
			<input
				type={type}
				className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--accent-border)] transition-all duration-200 ease-out'
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
			/>
		</div>
	);
}

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.isRequired,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	name: PropTypes.string,
};

export default InputField;
