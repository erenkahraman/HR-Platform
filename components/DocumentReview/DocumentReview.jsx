const DocumentReview = ({ title }) => {
	return (
		<div className="flex w-48 flex-col gap-2">
			<label htmlFor="status" className="block text-sm">
				{title}
			</label>
			<select
				id="status"
				name="status"
				className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			>
				<option>Has not submitted</option>
				<option>Need Review</option>
				<option>Incorrect</option>
				<option>Correct</option>
			</select>
		</div>
	);
};

export default DocumentReview;
