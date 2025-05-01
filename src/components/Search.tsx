import { MagnifyingGlass } from "phosphor-react";
import { SearchItens } from "./Search-Itens";
import { useState } from "react";

export function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="card">
      <div className="search-bar">
        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
          <MagnifyingGlass className="h-5 w-5" />
        </div>
        <input
          id="price"
          name="price"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block min-w-0 grow  pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
      </div>
      <div className="flex items-start gap-2 p-1 overflow-x-auto">
        <SearchItens id="i" name="javascript" key={0} />
        <SearchItens id="i" name="pyton" key={1} />
        <SearchItens id="i" name="programação" key={2} />
        {/* <SearchItens id="i" name="java" key={3} />
        <SearchItens id="i" name="c++" key={4} />
        <SearchItens id="i" name="c#" key={5} />
        <SearchItens id="i" name="php" key={6} />
        <SearchItens id="i" name="html" key={7} />
        <SearchItens id="i" name="css" key={8} />
        <SearchItens id="i" name="typescript" key={9} /> */}
      </div>
    </div>
  );
}
