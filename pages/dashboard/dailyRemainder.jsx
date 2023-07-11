import { Reminder } from "../../components/Reminder";


function news() {
    return (
        <section className="relative w-full">
            <div className="w-full mb-12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">

                    {/* Title Container */}
                    <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Daily Remainder</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto my-2">
                        <div className="items-center w-full bg-white p-4">
                            {/* Daily Reminder Content */}
                            <div className="py-2">
                                <Reminder
                                    color="text-red-500"
                                    title="HR Meeting"
                                    category="General"
                                    time="Today"
                                />
                            </div>

                            <div className="py-2">
                                <Reminder
                                    color="text-yellow-500"
                                    title="HR Interview: Wilson"
                                    category="Interview"
                                    time="10 September 2021"
                                />
                            </div>

                            <div className="py-2">
                                <Reminder
                                    color="text-yellow-500"
                                    title="Documents Update: Samara"
                                    category="Applicants"
                                    time="10 September 2021"
                                />
                            </div>

                            <div className="py-2">
                                <Reminder
                                    color="text-green-500"
                                    title="Update Calendar and Applicant Details"
                                    category="General"
                                    time="Everyday"
                                />
                            </div>

                            <div className="py-2">
                                <Reminder
                                    color="text-green-500"
                                    title="Check Applicant Documents"
                                    category="General"
                                    time="Everyday"
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
