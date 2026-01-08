import { API } from '../endpoints';
import { noAuthApiSlice } from '../apiSlice';

export const artistApiSlice = noAuthApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArtists: builder.query({
      query: (params) => ({
        url: API.artist,
        method: "GET",
        params
      }),
      providesTags: ['Artist'],
    }),
    getArtistById: builder.query({
      query: (id) => ({
        url: `${API.artist}/${id}`,
        method: "GET"
      }),
    }),
    getArtistBySlug: builder.query({
      query: (id) => ({
        url: `${API.artist}/sl/${id}`,
        method: "GET"
      }),
    }),
    getArtistDetail: builder.mutation({
      query: (id) => ({
        url: `${API.artist}/${id}`,
        method: "GET"
      }),
    })
  }),
});

export const {
  useGetAllArtistsQuery,
  useGetArtistByIdQuery,
  useGetArtistDetailMutation,
  useGetArtistBySlugQuery
} = artistApiSlice;
