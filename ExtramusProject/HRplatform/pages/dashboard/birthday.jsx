import { Reminder } from "../../components/Reminder";

function news() {
  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">
                  This Month's Birthdays 🥳🍰🎉
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto my-2">
            <div className="items-center w-full bg-white">
              {/* Birthday Content */}
              <div className="py-4">
                <Reminder
                  color="text-purple-500"
                  title="Lia Ciobanu"
                  category="ICT"
                  time="21 august 2022"
                />
              </div>

              <div className="py-4">
                <Reminder
                  color="text-purple-500"
                  title="Rimma Cechir"
                  category="ICT"
                  time="25 august 2022"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default news;
