import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { usePathname } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetSongBySlugQuery } from 'src/app/api/song/songApiSlice';

import { SongDetail } from '../song-detail';

import type { SongDetailProps } from '../song-detail';
// ----------------------------------------------------------------------

export function LyricDetailView() {
  const slug = usePathname().slice(1);

  const { data: songDetailData } = useGetSongBySlugQuery(slug);

  const [songDetail, setSongDetail] = useState<SongDetailProps>();

  useEffect(() => {
    if (songDetailData) {
      setSongDetail(songDetailData.data);
    }
  }, [songDetailData]);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SongDetail title="Lyrics" song={songDetail} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
