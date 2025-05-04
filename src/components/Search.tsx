import { MagnifyingGlass } from "phosphor-react";
import { SearchItens } from "./Search-Itens";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleContext } from "../contexts/ScheduleContext";

const schema = z.object({
  search: z.string().min(3, {
    message: "Please enter at least 3 characters",
  }),
});

type SearchForm = z.infer<typeof schema>;

export function Search() {
  const { termsSearch, setTerms } = useContext(ScheduleContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<SearchForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      search: "",
    },
  });
  function verifyErrors(data: SearchForm) {
    const isExistsWords = termsSearch?.find(
      (word) => word.name === data.search
    );
    if (isExistsWords) {
      setError("search", {
        type: "manual",
        message: "Please enter a different search term",
      });
      return;
    }
    return data;
  }

  function handleOnSubmit(data: SearchForm) {
    const verific = verifyErrors(data);
    if (!verific) return;
    setTerms([
      ...(termsSearch || []),
      {
        id: Date.now(),
        name: data.search.trim(),
      },
    ]);
    reset();
  }

  function handleOnDeleteWordsById(id: number) {
    const wordWithoutId = termsSearch?.filter((word) => word.id !== id);
    if (!wordWithoutId) return;
    setTerms(wordWithoutId);
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
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <span className="error">{errors.search?.message}</span>

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
