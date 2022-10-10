const DocumentReview = ({ title, id }) => {
	return (
		<div className="flex w-48 flex-col gap-2">
			<label htmlFor="status" className="block text-sm font-semibold">
				{title}
			</label>
			<select
				id = {id}
				name="status"
				className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			>
				<option>Not Submitted</option>
				<option>Need Review</option>
				<option>Incorrect</option>
				<option>Correct</option>
			</select>
		</div>
	);
};

export default DocumentReview;
