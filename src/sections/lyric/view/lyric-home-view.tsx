import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { useAppSelector } from 'src/app/hooks';
import { DashboardContent } from 'src/layouts/dashboard';
import { selectSearchValue } from 'src/app/api/search/searchSlice';
import { useGetAllSongsQuery } from 'src/app/api/song/songApiSlice';

import { Songs } from '../songs';

import type { SongItemProps } from '../songs';

// ----------------------------------------------------------------------

export function LyricHomeView() {
  const searchValue = useAppSelector(selectSearchValue);

  const { data: songData } = useGetAllSongsQuery({ title: searchValue });

  const [songs, setSongs] = useState<SongItemProps[]>([]);

  useEffect(() => {
    if (songData) {
      setSongs(songData?.data);
    }
  }, [songData]);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Songs title="Lyrics" list={songs} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
