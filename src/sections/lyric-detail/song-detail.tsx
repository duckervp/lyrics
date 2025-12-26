import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useSmoothNavigate } from 'src/hooks/use-smooth-navigate';

import { fToNow, fDateTime, formatPatterns } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import IosBackButton from 'src/components/button/back-button';

import LyricsViewer from '../lyric/lyric-viewer';
// ----------------------------------------------------------------------

export type SongDetailProps = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  artist: string;
  lyric: string;
  releaseAt: string;
  mainArtistName: string;
  mainArtistImageUrl: string;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  song?: SongDetailProps;
};

type DetailedTitleProps = {
  title?: string;
  songTitle?: string;
};

export function SongDetail({ title, subheader, song, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader
        title={<SongDetailHeader title={title} songTitle={song?.title} />}
        subheader={subheader}
        sx={{ mb: 1 }}
      />

      <Scrollbar sx={{ minHeight: { xs: '65vh' }, maxHeight: { md: '65vh' } }}>
        <Box sx={{ minWidth: { md: 640 } }}>
          <SongItemDetail song={song} />
        </Box>
      </Scrollbar>

      {/* <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box> */}
    </Card>
  );
}

// ----------------------------------------------------------------------
function SongDetailHeader({ title, songTitle }: DetailedTitleProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const go = useSmoothNavigate();
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: isMobile ? -6 : 0 }}>
        <IosBackButton label="" />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        {!isMobile && (
          <Typography variant="h4" onClick={() => go('/')} sx={{ cursor: 'pointer' }}>
            {title}
          </Typography>
        )}
        {!isMobile && <Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        <Typography variant="h5">{songTitle}</Typography>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

function SongItemDetail({ sx, song, ...other }: BoxProps & { song?: SongDetailProps }) {
  return (
    <Box>
      <Box
        sx={{
          py: 2,
          px: 3,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
          ...sx,
        }}
        {...other}
      >
        <Avatar
          variant="rounded"
          alt={song?.mainArtistName}
          src={song?.mainArtistImageUrl}
          sx={{ width: 48, height: 48, flexShrink: 0 }}
        />

        <ListItemText
          primary={song?.mainArtistName || 'Artist Name'}
          secondary={song?.releaseAt ? fDateTime(song?.releaseAt, formatPatterns.year) : 'Year'}
          slotProps={{
            primary: { noWrap: true, typography: 'subtitle2' },
            secondary: { mt: 0.5, noWrap: true, component: 'span' },
          }}
        />

        <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
          {song?.releaseAt ? fToNow(song?.releaseAt) : 'x years'}
        </Box>
      </Box>
      {song && <LyricsViewer lyrics={song.lyric} />}
    </Box>
  );
}
