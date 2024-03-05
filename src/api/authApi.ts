import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utils/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
