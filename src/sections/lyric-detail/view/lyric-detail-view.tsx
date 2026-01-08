import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';

import { usePathname } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetSongBySlugQuery, useIncreaseViewMutation } from 'src/app/api/song/songApiSlice';

import { SongDetail } from '../song-detail';

import type { SongDetailProps } from '../song-detail';
// ----------------------------------------------------------------------

export function LyricDetailView() {
  const slug = usePathname().slice(1);

  const { data: songDetailData } = useGetSongBySlugQuery(slug);

  const [increaseView] = useIncreaseViewMutation();

  const [songDetail, setSongDetail] = useState<SongDetailProps>();

  useEffect(() => {
    if (songDetailData) {
      setSongDetail(songDetailData.data);
    }
  }, [songDetailData]);

  const handleIncreaseView = useCallback(
    async (songId: number) => {
      await increaseView(songId);
    },
    [increaseView]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (songDetail?.id) {
        handleIncreaseView(songDetail?.id);
        setSongDetail((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            view: prev.view + 1,
          };
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [songDetail?.id, handleIncreaseView]);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SongDetail title="Lyrics" song={songDetail} setSong={setSongDetail} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
