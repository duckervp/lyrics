import type { ArtistRoleKey } from 'src/utils/type';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useSmoothNavigate } from 'src/hooks/use-smooth-navigate';

import { ArtistRoleLabel } from 'src/utils/type';

// import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export type IArtistItem = {
  id: number;
  name: string;
  slug: string;
  avatarUrl: string;
  coverUrl: string;
  roleInSong: ArtistRoleKey;
};

export function ArtistItem({
  sx,
  artist,
  ...other
}: CardProps & {
  artist: IArtistItem;
}) {
  const go = useSmoothNavigate();

  const renderAvatar = (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        // top: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9,
      }}
    >
      <Avatar
        alt={artist.name}
        src={artist.avatarUrl}
        sx={{
          width: 64,
          height: 64,
        }}
      />
    </Box>
  );

  const renderName = (
    <Typography
      color="inherit"
      variant="subtitle2"
      sx={{
        textAlign: 'center',
        mb: 1,
        // height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        cursor: 'pointer',
      }}
      onClick={() => go(`/?artist=${artist.slug}`)}
    >
      {artist.name}
    </Typography>
  );

  const renderCover = (
    <Box
      component="img"
      alt={artist.name}
      src={artist.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderSongRole = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        textAlign: 'center',
        mb: 1,
        color: 'text.disabled',
      }}
    >
      {ArtistRoleLabel[artist.roleInSong]}
    </Typography>
  );

  // const renderShape = (
  //   <SvgColor
  //     src="/assets/icons/shape-avatar.svg"
  //     sx={{
  //       left: 66,
  //       width: 88,
  //       zIndex: 9,
  //       height: 35,
  //       bottom: -16,
  //       position: 'absolute',
  //       color: 'background.paper',
  //     }}
  //   />
  // );

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          pt: 'calc(100% * 3 / 4)',
        })}
      >
        {/* {renderShape} */}
        {renderAvatar}
        {renderCover}
      </Box>

      <Box
        sx={(theme) => ({
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        })}
      >
        {renderName}
        {renderSongRole}
      </Box>
    </Card>
  );
}
