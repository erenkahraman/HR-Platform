const Upcoming = ({ name, department, status, time }) => {
	const statusColor = () => {
		let colorText;

		status === "Arriving"
			? (colorText = "text-green-500")
			: (colorText = "text-red-500");

		let result =
			"flex-[1] flex items-center justify-center text-xs " + colorText;
		return result;
	};

	return (
		<div className="flex w-full">
			<div className="flex-[1] flex flex-col">
				<div className="text-sm font-semibold">{name}</div>
				<div className="text-xs font-light ">{department}</div>
			</div>
			<div className={statusColor()}>{status}</div>
			<div className="flex-[1] flex items-center justify-center text-xs text-gray-500">
				{time}
			</div>
		</div>
	);
};

export default Upcoming;
