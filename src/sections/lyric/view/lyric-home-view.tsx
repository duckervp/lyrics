import type { ArtistRoleKey } from 'src/utils/type';
import type { LyricItemProps } from 'src/sections/components/lyric-item';

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

import { ArtistRoleLabel } from 'src/utils/type';

import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { selectSearchMode, selectSearchValue } from 'src/app/api/search/searchSlice';
import { useGetAllSongsQuery, useLazyGetAllSongsQuery } from 'src/app/api/song/songApiSlice';
import { useGetAllArtistsQuery, useGetArtistBySlugQuery } from 'src/app/api/artist/artistApiSlice';

import { Songs } from '../songs';
// ----------------------------------------------------------------------

export type SongItemProps = {
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

export type ArtistItemProps = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  role: ArtistRoleKey;
};

export function LyricHomeView() {
  const [searchParams] = useSearchParams();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const limit = useMemo(() => {
    if (isXs) return 5; // small phones
    if (isMdUp) return 4; // tablets / desktop
    return 10; // sm
  }, [isXs, isMdUp]);

  const artistQuery = searchParams.get('artist');
  const searchValue = useAppSelector(selectSearchValue);

  const currentMode = useAppSelector(selectSearchMode);

  const { data: songData, isFetching } = useGetAllSongsQuery(
    { title: searchValue, artist: artistQuery || undefined, limit },
    { skip: currentMode !== 'song' }
  );

  const [fetchMore] = useLazyGetAllSongsQuery();

  const { data: artistData } = useGetAllArtistsQuery(
    { name: searchValue },
    { skip: currentMode !== 'artist' }
  );

  const { data: selectedArtistData } = useGetArtistBySlugQuery(artistQuery, { skip: !artistQuery });

  // const [selectedArtist, setSelectedArtist] = useState<ArtistItemProps>();

  const list: LyricItemProps[] = useMemo(() => {
    if (currentMode === 'song' && songData?.data?.items) {
      return songData.data.items.map((item: SongItemProps) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        primary: item.title,
        primaryLink: `/${item.slug}`,
        secondary: item.mainArtistName,
        secondaryLink: `?artist=${item.mainArtistSlug}`,
        date: item.releaseAt,
      }));
    }

    if (currentMode === 'artist' && artistData?.data) {
      return artistData.data.map((item: ArtistItemProps) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        primary: item.name,
        primaryLink: `?artist=${item.slug}`,
        secondary: ArtistRoleLabel[item.role],
      }));
    }

    return [];
  }, [currentMode, songData, artistData?.data]);

  const selectedArtist: ArtistItemProps = useMemo(() => {
    if (selectedArtistData && artistQuery) {
      return selectedArtistData.data;
    }

    return null;
  }, [selectedArtistData, artistQuery]);

  const loadMore = () => {
    if (!songData?.data?.nextCursor || isFetching) return;

    fetchMore({
      title: searchValue,
      artist: artistQuery || undefined,
      cursor: songData.data.nextCursor,
      limit,
    });
  };

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Songs
            title="Lyrics"
            sub={selectedArtist?.name}
            list={list}
            loadMore={
              currentMode === 'song' &&
              songData?.data?.nextCursor && (
                <Box display="flex" justifyContent="center" mt={{ xs: 1, md: 4 }}>
                  <Button
                    // variant="outlined"
                    color="inherit"
                    disabled={isFetching}
                    onClick={loadMore}
                    startIcon={isFetching ? <CircularProgress size={18} /> : null}
                  >
                    {isFetching ? 'Loading...' : 'Load more'}
                  </Button>
                </Box>
              )
            }
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
