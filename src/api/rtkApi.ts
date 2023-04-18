import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { wkToken } from "./user/userToken";

const apiBase = "https://api.wanikani.com/v2";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBase,
    prepareHeaders: async (headers) => {
      headers.set("Authorization", `Bearer ${wkToken}`);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: [
    "Subject",
    "StudyMaterials",
    "ReviewStatistics",
    "Reviews",
    "Assignments",
  ],
});
