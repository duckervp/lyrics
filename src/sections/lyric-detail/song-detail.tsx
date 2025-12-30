import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { fToNow, fDateTime, formatPatterns } from 'src/utils/format-time';

import { Scrollbar } from 'src/components/scrollbar';

import LyricsViewer from '../lyric/lyric-viewer';
import { LyricHeader } from '../components/lyric-header';
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

export function SongDetail({ title, subheader, song, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader
        title={<LyricHeader title={title} sub={song?.title} />}
        subheader={subheader}
        sx={{ mb: 1 }}
      />

      <Scrollbar sx={{ minHeight: { xs: '78.5vh', md: '65vh' }, maxHeight: { md: '65vh' } }}>
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
