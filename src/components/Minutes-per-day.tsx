import { NumberOfVideos } from "./Number-of-videos";

export function MinutesPerDay() {
  return (
    <div className="card">
      <div className="flex flex-col gap-2">
        <h1 className="text-md font-bold">Minutes per day</h1>
        <div className="grid grid-cols-7 gap-2 text-center text-gray-500">
          <p>Mon</p>
          <p>Tue</p>
          <p>Wed</p>
          <p>Thu</p>
          <p>Fri</p>
          <p>Sat</p>
          <p>Sun</p>
        </div>
        <div className="grid grid-cols-7 gap-2 place-content-center">
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0"
            className="rounded-2xl shadow-sm p-2 w-full border border-gray-300"
          />
        </div>
      </div>
      <NumberOfVideos />
    </div>
  );
}
