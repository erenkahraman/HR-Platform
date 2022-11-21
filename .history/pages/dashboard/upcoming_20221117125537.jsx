import Upcoming from "../../components/Upcoming/Upcoming";


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


function news() {
    return (
        <section className="relative w-full">
            <div className="w-full mb-12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">

                    {/* Title Container */}
                    <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Upcoming Arrival and Departure</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto my-2">
                        <div className="items-center w-full bg-white px-4">
                            {/* Arrival Departure Content*/}
                            <div className="py-2">
                                <Upcomin 
                                    name=(`[name=${intern.student.firstName} ${intern.student.lastName}]`)
                                    department=(`[department=${intern.student.department}]`)
                                    status=(`[status=${intern.status}]`)
                                    time=(`[time=${intern.time}]`)
                                /> 
                            </div>

                            <div className="py-2">
                                <Upcoming
                                    name=(`[name=${intern.student.firstName} ${intern.student.lastName}]`)
                                    department=(`[department=${intern.student.department}]`)
                                    status=(`[status=${intern.status}]`)
                                    time=(`[time=${intern.time}]`)
                                />
                                
                                /></div>

                            <div className="py-2">
                                <Upcoming
                                    name="Jordyn Dias"
                                    department="Project Management"
                                    status="Departing"
                                    time="05 September 2022"
                                /></div>

                            <div className="py-2">
                                <Upcoming
                                    name="Cooper Gouse"
                                    department="Business Analyst"
                                    status="Arriving"
                                    time="07 September 2022"
                                />
                            </div>

                            <div className="py-2">
                                <Upcoming
                                    name="Desirae Stanton"
                                    department="ICT"
                                    status="Arriving"
                                    time="10 September 2022"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default news;
