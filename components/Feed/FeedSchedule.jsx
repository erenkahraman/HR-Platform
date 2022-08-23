const FeedSchedule = () => {
	return (
		<div className="flex m-2 py-4">
			<div className="flex flex-[1] flex-col gap-2 p-2">
				<div className="text-sm font-semibold">10 August 2022</div>
				<div className="text-xs font-light">
					<div>posted by</div>
					<div>Antonio Gallo</div>
				</div>
			</div>
			<div className="flex flex-[3] flex-col gap-2 p-2">
				<div className="text-sm font-semibold">
					Morning Shift 8:00 to 13:00   	
                </div>
				<div className="text-xs font-light">
						<br />Human Resurce Departament : 4
						<br />-Isata Sajor Bah
						<br />-Katerina Svarcova
						<br />-etc
						<br />-etc
						<br />
						<br />Departament	
						<br />-etc
						<br />-etc
				</div>
			</div>
			<div className="flex flex-[1] p-2">
				<div className="flex h-fit text-sm font-semibold underline cursor-pointer">
					Read More
				</div>
			</div>
		</div>
	);
};

export default FeedSchedule;
