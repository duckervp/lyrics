import { API } from '../endpoints';
import { noAuthApiSlice } from '../apiSlice';

export const songApiSlice = noAuthApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: (params) => ({
        url: API.song,
        method: "GET",
        params
      }),
      providesTags: ['Song'],
    }),
    getSongById: builder.query({
      query: (id) => ({
        url: `${API.song}/${id}`,
        method: "GET"
      }),
    }),
    getSongBySlug: builder.query({
      query: (id) => ({
        url: `${API.song}/sl/${id}`,
        method: "GET"
      }),
    }),
    getSongDetail: builder.mutation({
      query: (id) => ({
        url: `${API.song}/${id}`,
        method: "GET"
      }),
    }),
    // createSong: builder.mutation({
    //   query: (payload) => ({
    //     url: `${API.song}`,
    //     method: "POST",
    //     body: { ...payload },
    //   }),
    //   invalidatesTags: ['Song'],
    // }),
    // deleteSong: builder.mutation({
    //   query: (id) => ({
    //     url: `${API.song}/${id}`,
    //     method: "DELETE"
    //   }),
    //   invalidatesTags: ['Song'],
    // }),
    // updateSong: builder.mutation({
    //   query: ({ id, payload }) => ({
    //     url: `${API.song}/${id}`,
    //     method: "PATCH",
    //     body: { ...payload },
    //   }),
    //   invalidatesTags: ['Song'],
    // }),
    // deleteSongs: builder.mutation({
    //   query: (ids) => ({
    //     url: `${API.song}/${ids.join()}`,
    //     method: "DELETE"
    //   }),
    //   invalidatesTags: ['Song'],
    // }),
  }),
});

export const {
  useGetAllSongsQuery,
  useGetSongByIdQuery,
  useGetSongDetailMutation,
  useGetSongBySlugQuery
} = songApiSlice;
