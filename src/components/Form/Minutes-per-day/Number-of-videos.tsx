import { UseFormRegister } from "react-hook-form";
import { SearchForm } from "../schema";

type NumberOfVideosProps = {
  register: UseFormRegister<SearchForm>;
  error: boolean;
};

export function NumberOfVideos({ register, error }: NumberOfVideosProps) {
  return (
    <div className="py-4 gap-2 flex flex-col">
      <h1 className="text-md font-bold">Number Of Videos</h1>
      <input
        id="qtdeVideos"
        type="number"
        className={`input  ${error ? "input-error" : ""}`}
        {...register("qtdeVideos", {
          valueAsNumber: true,
        })}
      />
    </div>
  );
}
