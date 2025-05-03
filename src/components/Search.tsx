import { MagnifyingGlass } from "phosphor-react";
import { SearchItens } from "./Search-Itens";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SearchProps =
  | {
      id: number;
      name: string;
    }[]
  | null;

type SearchItensProps = {
  search: string;
};

export function Search() {
  const { register, handleSubmit } = useForm<SearchItensProps>();
  const [words, setWords] = useState<SearchProps>(null);

  function handleOnSubmit(data: SearchItensProps) {
    const cloneWords = [...(words || [])];
    setWords([
      ...cloneWords,
      {
        id: Math.floor(Math.random() * 100),
        name: data.search,
      },
    ]);
  }

  function handleOnDelete(id: number) {
    const cloneWords = [...(words || [])];
    const newWords = cloneWords.filter((word) => word.id !== id);
    setWords(newWords);
  }
  return (
    <div className="card">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="search-bar">
        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
          <MagnifyingGlass className="h-5 w-5" />
        </div>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          className="block min-w-0 grow  pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          {...register("search")}
        />
        <button
          type="submit"
          className="bg-blue-900 rounded-md text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out p-1  text-sm"
        >
          Search
        </button>
      </form>

      <div className="flex items-start gap-2 p-1 overflow-x-auto">
        {words?.map((word) => (
          <SearchItens
            id={word.id}
            name={word.name}
            key={word.id}
            handleOnDelete={handleOnDelete}
          />
        ))}
      </div>
    </div>
  );
}
