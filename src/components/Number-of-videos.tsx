import { UseFormRegister } from "react-hook-form";
import { MinutesFormData } from "./Input-minutes-per-day";

type NumberOfVideosProps = {
  register: UseFormRegister<MinutesFormData>;
};

export function NumberOfVideos({ register }: NumberOfVideosProps) {
  return (
    <div className="py-4 gap-2 flex flex-col">
      <h1 className="text-md font-bold">Number Of Videos</h1>
      <input
        id="qtdevideos"
        type="number"
        placeholder="0"
        defaultValue={0}
        className="input"
        {...register("qtdevideos")}
      />
    </div>
  );
}
