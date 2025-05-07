import { MagnifyingGlass } from "phosphor-react";
import { SearchItens } from "./Search-Itens";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { ScheduleContext } from "../../../contexts/ScheduleContext";

export function Search() {
  const { termsSearch, setTerms } = useContext(ScheduleContext);
  const {
    register,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  function verifyErrors(term: string) {
    const isExistsWords = termsSearch?.find((word) => word.name === term);
    if (isExistsWords) {
      setError("search", {
        type: "manual",
        message: "Please enter a different search term",
      });
      return;
    }
    return term;
  }

  function handleOnSearch() {
    const verific = verifyErrors(getValues("search"));
    if (!verific) return;
    setTerms([
      ...(termsSearch || []),
      {
        id: Date.now(),
        name: getValues("search").trim(),
      },
    ]);
    setValue("search", "");
  }

  function handleOnDeleteWordsById(id: number) {
    const wordWithoutId = termsSearch?.filter((word) => word.id !== id);
    if (!wordWithoutId) return;
    setTerms(wordWithoutId);
  }

  return (
    <div className="card">
      <div className="search-bar">
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
        <button type="button" className="button" onClick={handleOnSearch}>
          Search
        </button>
      </div>
      <span className="error">{errors.search?.message as string}</span>

      <div className="flex items-start gap-2 p-1 overflow-x-auto">
        {termsSearch?.map((word) => (
          <SearchItens
            id={word.id}
            name={word.name}
            key={word.id}
            handleOnDeleteWordsById={handleOnDeleteWordsById}
          />
        ))}
      </div>
    </div>
  );
}
