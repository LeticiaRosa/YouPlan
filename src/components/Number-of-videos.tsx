export function NumberOfVideos() {
  return (
    <div className="py-4 gap-2 flex flex-col">
      <h1 className="text-md font-bold">Number Of Videos</h1>
      <input
        id="qtdevideos"
        name="qtdevideos"
        type="number"
        placeholder="0"
        className="rounded-2xl shadow-sm p-2 border border-gray-300 max-w-20"
      />
    </div>
  );
}
