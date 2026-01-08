import { API } from '../endpoints';
import { noAuthApiSlice } from '../apiSlice';

export type Song = {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  artist: string;
  description: string;
  releaseAt: string;
  mainArtistName: string;
  mainArtistImageUrl: string;
  mainArtistSlug: string;
};


export type SongData = {
  items: Song[];
  nextCursor: string | null;
  _limit: number;
};


export const songApiSlice = noAuthApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSongs: builder.query<
      { data: SongData },
      { title?: string; artist?: string; cursor?: string; limit?: number; }
    >({
      query: ({ title, artist, cursor, limit }) => ({
        url: `${API.song}/c`,
        method: "GET",
        params: {
          title,
          artist,
          cursor,
          limit: limit || 5,
        },
      }),

      // 👇 ignore cursor so all pages share same cache entry
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { title, artist, limit } = queryArgs;
        return `${endpointName}-${title ?? ""}-${artist ?? ""}-${limit ?? 5}`;
      },

      // 👇 append instead of replace
      merge: (currentCache, newData) => {
        const newItems = newData.data.items || [];

        // No cache yet → first page
        if (!currentCache || !currentCache.data?.items?.length) {
          return newData;
        }

        const oldItems = currentCache.data.items;
        const oldIds = new Set(oldItems.map(i => i.id));

        // 🚨 detect duplicated item
        const hasDuplicate = newItems.some(i => oldIds.has(i.id));

        // If duplicated → this is page-1 reload → RESET CACHE
        if (hasDuplicate) {
          return newData;
        }

        // Normal next page → append
        oldItems.push(...newItems);
        currentCache.data.nextCursor = newData.data.nextCursor;
        currentCache.data._limit = newData.data._limit;

        return currentCache;
      },

      // 👇 reset when filters change
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.title !== previousArg?.title ||
          currentArg?.artist !== previousArg?.artist
        );
      },

      providesTags: (result, error, arg) => [
        { type: 'Song', id: `LIST-${arg.title ?? ''}-${arg.artist ?? ''}-${arg.limit ?? 5}` }
      ],
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
    increaseView: builder.mutation({
      query: (id) => ({
        url: `${API.song}/${id}/view`,
        method: "POST"
      }),
      invalidatesTags: ['Song'],
    }),
    increaseFire: builder.mutation({
      query: (id) => ({
        url: `${API.song}/${id}/fire`,
        method: "POST"
      }),
      invalidatesTags: ['Song'],
    }),
    increaseSnow: builder.mutation({
      query: (id) => ({
        url: `${API.song}/${id}/snow`,
        method: "POST"
      }),
      invalidatesTags: ['Song'],
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
  useLazyGetAllSongsQuery,
  useGetSongByIdQuery,
  useGetSongDetailMutation,
  useGetSongBySlugQuery,
  useIncreaseViewMutation,
  useIncreaseFireMutation,
  useIncreaseSnowMutation
} = songApiSlice;
