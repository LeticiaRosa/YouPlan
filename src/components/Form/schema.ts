import { z } from "zod";

export const schema = z.object({
  Mon: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  Tue: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  Wed: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  Thu: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  Fri: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  Sat: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  Sun: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440),
  qtdeVideos: z
    .number({
      message: "Informe por favor a quantidade de videos na semana",
    })
    .min(1, "Informe por favor a quantidade de vídeos")
    .max(100, "Informe por favor a quantidade de vídeos entre 1 e 100"),
  search: z.string(),
});

export type SearchForm = z.infer<typeof schema>;
