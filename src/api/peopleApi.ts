import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constants";

export const peopleApi = createApi({
    reducerPath: 'peopleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            return headers
        }
    }),

    endpoints: (build) => ({
        fetchPeopleList: build.query({
            query: ({per_page}) => `/users?per_page=${per_page}`,
        }),
        fetchSinglePerson: build.query({
            query: ({id}) => `/users/${id}`,
        })
    }),


})

export const {useFetchPeopleListQuery, useFetchSinglePersonQuery} = peopleApi;