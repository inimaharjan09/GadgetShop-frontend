import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://192.168.1.9:5000';
//export const baseUrl = 'https://gshop-k7d4.onrender.com';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
  }),
  endpoints: (builder) => ({}),
});
