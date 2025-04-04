import React from 'react';

function FooterComponent() {
	return (
		<footer className='text-gray-100 mt-3 py-3'>
			<div className='container mx-auto text-center'>
				<p className='text-sm'>&copy; {new Date().getFullYear()} Taskly. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default FooterComponent;
