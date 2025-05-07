import { FormProvider, useForm } from "react-hook-form";
import { Search } from "./Search/Search";
import { MinutesPerDay } from "./Minutes-per-day/Minutes-per-day";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { z } from "zod";

export function Form() {
  type SearchForm = z.infer<typeof schema>;
  const methods = useForm<SearchForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
      qtdeVideos: 0,
      search: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <Search />
      <MinutesPerDay />
    </FormProvider>
  );
}
