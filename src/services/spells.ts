// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const dndApiSpell = createApi({
  reducerPath: "dndApiSpell",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.dnd5eapi.co/api/" }),
  tagTypes: ["Spell"],
  endpoints: (builder) => ({
    getAllSpells: builder.query({
      query: () => `spells`,
    }),
    getSpellByIndex: builder.query({
      query: (index) => `spells/${index}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSpellsQuery, useGetSpellByIndexQuery } = dndApiSpell;
