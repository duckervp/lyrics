import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useSmoothNavigate } from 'src/hooks/use-smooth-navigate';

import { fToNow } from 'src/utils/format-time';

import { Searchbar } from 'src/layouts/components/searchbar';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

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
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: SongItemProps[];
};

type TitleProps = {
  title?: string;
};

export function Songs({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={<LyricHeader title={title} />} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: { xs: '60vh' }, maxHeight: { md: '60vh' } }}>
        <Box sx={{ minWidth: { md: 640 } }}>
          {list.map((song) => (
            <SongItem key={song.id} item={song} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
function LyricHeader({ title }: TitleProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
      <Typography variant="h4">{title}</Typography>
      <Searchbar />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function SongItem({ sx, item, ...other }: BoxProps & { item: SongItemProps }) {
  const go = useSmoothNavigate();
  return (
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
        alt={item.title}
        src={item.imageUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={
          <Typography
            component="span"
            onClick={() => go(item.slug)}
            variant="subtitle2"
            sx={{
              cursor: 'pointer',
              color: 'text.primary',
            }}
          >
            {item.title}
          </Typography>
        }
        secondary={item.mainArtistName}
        slotProps={{
          primary: { noWrap: true, typography: 'subtitle2' },
          secondary: { mt: 0.5, noWrap: true, component: 'span' },
        }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(item.releaseAt)}
      </Box>
    </Box>
  );
}
