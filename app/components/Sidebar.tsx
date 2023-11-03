export const Sidebar = () => {
  return (
    <aside className="flex w-[420px] min-w-[300px] min-h-full flex-col justify-start items-start gap-2 resize-x overflow-auto">
      <div className="self-stretch h-40 bg-neutral-900 rounded-lg flex-col justify-start items-start flex">Content</div>

      <div className="h-full flex-1 self-stretch bg-neutral-900 rounded-lg flex-col justify-start items-start flex p-2">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex">
          <div className="self-stretch h-14 px-4 py-2 flex-col justify-start items-start flex">
            <p className="text-center text-neutral-400 text-base font-bold font-inter">Your Library</p>
          </div>

          <div className="self-stretch h-96 flex-col justify-start items-start flex gap-4">
            <div className="self-stretch h-32 pl-5 pr-52 py-4 bg-neutral-800 rounded-lg flex-col justify-center items-start gap-5 flex">
              <p>Content</p>
            </div>

            <div className="self-stretch h-32 pl-5 pr-52 py-4 bg-neutral-800 rounded-lg flex-col justify-center items-start gap-5 flex">
              <p>Content</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
