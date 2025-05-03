import { X } from "phosphor-react";

export interface SearchItensProps {
  id: number;
  name: string;
  handleOnDeleteWordsById: (id: number) => void;
}

export function SearchItens({
  id,
  name,
  handleOnDeleteWordsById,
}: SearchItensProps) {
  return (
    <button
      key={id}
      className="flex bg-blue-900 rounded-2xl text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out"
      onClick={() => handleOnDeleteWordsById(id)}
    >
      <div className="sm:text-sm/6 px-2">{name}</div>
      <div className="flex items-center justify-center p-1">
        <X className="w-3" />
      </div>
    </button>
  );
}
