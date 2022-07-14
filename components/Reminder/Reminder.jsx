import { Circle } from "@mui/icons-material";

const Reminder = ({ color, title, category, time }) => {
	const circleColor = () => {
		let result = "text-sm " + color;
		return result;
	};

	return (
		<div className="flex w-full">
			<div className="flex-[1] flex items-center justify-center">
				<Circle className={circleColor()} />
			</div>
			<div className="flex-[5] flex flex-col">
				<div className="text-sm font-semibold">{title}</div>
				<div className="text-xs font-light ">{category}</div>
			</div>
			<div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
				{time}
			</div>
		</div>
	);
};

export default Reminder;
