const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-950'>
			<div className='relative' role='status' aria-live='polite'>
				<div className='w-16 h-16 border-2 border-gray-700 rounded-full' />
				<div className='w-16 h-16 border-2 border-transparent border-t-emerald-400 animate-spin rounded-full absolute left-0 top-0' />
				<div className='sr-only'>Loading</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;