import type { ArtistRoleKey } from 'src/utils/type';
import type { LyricItemProps } from 'src/sections/components/lyric-item';

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { ArtistRoleLabel } from 'src/utils/type';

import { useAppSelector } from 'src/app/hooks';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetAllSongsQuery } from 'src/app/api/song/songApiSlice';
import { selectSearchMode, selectSearchValue } from 'src/app/api/search/searchSlice';
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

  const artistQuery = searchParams.get('artist');
  const searchValue = useAppSelector(selectSearchValue);

  const currentMode = useAppSelector(selectSearchMode);

  console.log(currentMode);

  const { data: songData } = useGetAllSongsQuery(
    { title: searchValue, artist: artistQuery || undefined },
    { skip: currentMode !== 'song' }
  );

  const { data: artistData } = useGetAllArtistsQuery(
    { name: searchValue },
    { skip: currentMode !== 'artist' }
  );

  const { data: selectedArtistData } = useGetArtistBySlugQuery(artistQuery, { skip: !artistQuery });

  // const [selectedArtist, setSelectedArtist] = useState<ArtistItemProps>();

  const list: LyricItemProps[] = useMemo(() => {
    if (currentMode === 'song' && songData?.data) {
      return songData.data.map((item: SongItemProps) => ({
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
  }, [currentMode, songData, artistData]);

  const selectedArtist: ArtistItemProps = useMemo(() => {
    if (selectedArtistData && artistQuery) {
      return selectedArtistData.data;
    }

    return null;
  }, [selectedArtistData, artistQuery]);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Songs title="Lyrics" sub={selectedArtist?.name} list={list} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
