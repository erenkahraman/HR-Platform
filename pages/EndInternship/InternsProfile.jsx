const Feed = () => {
  return (
    <div className="flex m-2 py-4">
      <div className="flex flex-[1] flex-col gap-2 p-2">
        <div className="text-sm font-semibold">20 August 2021</div>
        <div className="text-xs font-light">
          <div>posted by</div>
          <div>Antonio Gallo</div>
        </div>
      </div>
      <div className="flex flex-[3] flex-col gap-2 p-2">
        <div className="text-sm font-semibold">
          Project Management Presentation
        </div>
        <div className="text-xs font-light">
          In monday 23 august there Will he a presentation from project
          management regardina the theater platform. Please prepare the
          necessary documents. In monday 23 august there Will he a presentation
          from project management regardina the theater platform. Please prepare
          the necessary documents.
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

export default Feed;
