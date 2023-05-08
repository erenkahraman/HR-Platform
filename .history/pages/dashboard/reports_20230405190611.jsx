
import { Interview } from '../../components/Interview';

function Interviews() {
  return (
    <section className="relative w-full">
            <div className="w-full mb-12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">

                    {/* Title Container */}
                    <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Interviews</h3>

                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto my-2">
                        <div className="items-center w-full bg-white px-4">
                            {/* Interview Content*/}
                            <div className="py-2">
                                <Interview

                                    name="Marcus Botosh"
                                    department="ICT"
                                    status="Arriving"
                                    time="02 September 2022"
                                />
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </section>
  );
}
export default Interviews;
