import Feed from "../../components/Feed/Feed";

function News() {
  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">What's new</h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <div className="items-center w-full border-collapse bg-white">
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
