import type { BoxProps } from '@mui/material/Box';
import type { ArtistRoleKey } from 'src/utils/type';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ListItemText from '@mui/material/ListItemText';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
import useMediaQuery from '@mui/material/useMediaQuery';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import { fShortenNumber } from 'src/utils/format-number';
import { fToNow, fDateTime, formatPatterns } from 'src/utils/format-time';

import { useIncreaseFireMutation, useIncreaseSnowMutation } from 'src/app/api/song/songApiSlice';

import { Scrollbar } from 'src/components/scrollbar';

import { ArtistItem } from './artist-item';
import LyricsViewer from '../lyric/lyric-viewer';
import { LyricHeader } from '../components/lyric-header';
// ----------------------------------------------------------------------

type ArtistItemProps = {
  artistId: number;
  role: ArtistRoleKey;
  artistName: string;
  artistSlug: string;
  artistRole: string;
  artistImageUrl: string;
};

export type SongDetailProps = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  artist: string;
  lyric: string;
  releaseAt: string;
  mainArtistName: string;
  mainArtistImageUrl: string;
  view: number;
  fire: number;
  snow: number;
  artists: ArtistItemProps[];
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  song?: SongDetailProps;
  setSong: (s: any) => void;
};

export function SongDetail({ title, subheader, song, setSong, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader
        title={<LyricHeader title={title} sub={song?.title} />}
        subheader={subheader}
        sx={{ mb: 1 }}
      />

      <Scrollbar
        sx={{ minHeight: { xs: '77vh', md: '65vh' }, maxHeight: { xs: '77vh', md: '65vh' } }}
      >
        <Box sx={{ minWidth: { md: 640 } }}>
          <SongItemDetail song={song} setSong={setSong} />
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

function SongItemDetail({
  sx,
  song,
  setSong,
  ...other
}: BoxProps & { song?: SongDetailProps; setSong: (s: any) => void }) {
  const [increaseFire] = useIncreaseFireMutation();
  const [increaseSnow] = useIncreaseSnowMutation();

  const theme1 = useTheme();
  const isXs = useMediaQuery(theme1.breakpoints.only('xs'));
  const isMdUp = useMediaQuery(theme1.breakpoints.up('md'));

  const handleFireClick = async () => {
    if (song && song.id) {
      await increaseFire(song?.id);
      setSong((prev: any) => {
        if (!prev) return prev;

        return {
          ...prev,
          fire: prev.fire + 1,
        };
      });
    }
  };

  const handleSnowClick = async () => {
    if (song && song.id) {
      await increaseSnow(song.id);
      setSong((prev: any) => {
        if (!prev) return prev;

        return {
          ...prev,
          snow: prev.snow + 1,
        };
      });
    }
  };

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
          secondary={
            <Stack direction="row" spacing={1} alignItems="center" component="span">
              <Typography variant="body2" color="text.secondary" noWrap component="span">
                {song?.releaseAt ? fDateTime(song.releaseAt, formatPatterns.year) : 'Year'}
              </Typography>

              {isXs && (
                <Typography variant="body2" color="text.disabled" component="span">
                  ·
                </Typography>
              )}

              {isXs && (
                <Typography variant="body2" color="text.secondary" noWrap component="span">
                  {song?.releaseAt ? fToNow(song?.releaseAt) : 'x years'}
                </Typography>
              )}
            </Stack>
          }
          slotProps={{
            primary: { noWrap: true, typography: 'subtitle2' },
            secondary: { mt: 0.5, noWrap: true, component: 'span' },
          }}
        />

        <Stack textAlign="end">
          {isMdUp && (
            <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
              {song?.releaseAt ? fToNow(song?.releaseAt) : 'x years'}
            </Box>
          )}
          {isXs && (
            <Box
              sx={{
                display: 'flex',
                color: 'text.disabled',
                justifyContent: 'end',
                alignItems: 'center',
                mt: 1.25,
              }}
            >
              <VisibilityIcon sx={{ fontSize: 16, mr: 1.5 }} />
              <Typography variant="caption">{fShortenNumber(song?.view)}</Typography>
            </Box>
          )}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                color: 'text.disabled',
                alignItems: 'center',
              }}
            >
              {/* <WhatshotIcon sx={{ fontSize: 16, mr: 0.5 }} /> */}
              <IconButton sx={{ mr: 0.5 }} onClick={handleFireClick}>
                <LocalFireDepartmentIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <Typography variant="caption">{fShortenNumber(song?.fire)}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                color: 'text.disabled',
                alignItems: 'center',
              }}
            >
              <IconButton sx={{ mr: 0.5 }} onClick={handleSnowClick}>
                <AcUnitIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <Typography variant="caption">{fShortenNumber(song?.snow)}</Typography>
            </Box>
            {isMdUp && (
              <Box
                sx={{
                  display: 'flex',
                  color: 'text.disabled',
                  alignItems: 'center',
                }}
              >
                <VisibilityIcon sx={{ fontSize: 16, mr: 1.5 }} />
                <Typography variant="caption">{fShortenNumber(song?.view)}</Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ maxHeight: { xs: '65vh', md: 400 }, overflowY: 'auto' }}>
        {song && <LyricsViewer lyrics={song.lyric} />}
        <Box sx={{ px: 2 }}>
          <Divider variant="middle">
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              Artists
            </Typography>
          </Divider>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ p: 3 }}
        >
          {song?.artists.map((item, index) => (
            <Box key={item.artistId} sx={{ width: 200 }}>
              <ArtistItem
                artist={{
                  id: item.artistId,
                  name: item.artistName,
                  slug: item.artistSlug,
                  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
                  avatarUrl: item.artistImageUrl,
                  // avatarUrl: item.artistImageUrl || `/assets/images/avatar/avatar-${index + 1}.webp`,
                  roleInSong: item.role,
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
