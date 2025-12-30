import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

type SearchMode = 'song' | 'artist';

export default function SearchModeSwitch({
  value,
  onChange,
}: {
  value: SearchMode;
  onChange: (mode: SearchMode) => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isArtist = value === 'artist';

  const WIDTH = isMobile ? 180 : 220;
  const HEIGHT = isMobile ? 38 : 44;
  const FONT_SIZE = isMobile ? 13 : 15;

  return (
    <Box
      sx={{
        mx: 1,
        width: WIDTH,
        height: HEIGHT,
        bgcolor: 'grey.200',
        borderRadius: 99,
        position: 'relative',
        p: '3px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'manipulation',
      }}
    >
      {/* Sliding pill */}
      <Box
        sx={{
          position: 'absolute',
          top: 3,
          left: isArtist ? `calc(50% + 1px)` : 3,
          width: '50%',
          height: 'calc(100% - 6px)',
          bgcolor: 'black',
          borderRadius: 99,
          boxShadow: 1,
          transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Song */}
      <Tooltip title="Song Mode">
        <Box
          onClick={() => onChange('song')}
          sx={{
            flex: 1,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography
            fontSize={FONT_SIZE}
            fontWeight={!isArtist ? 800 : 500}
            color={!isArtist ? 'white' : 'text.disabled'}
          >
            Song
          </Typography>
        </Box>
      </Tooltip>

      {/* Artist */}
      <Tooltip title="Artist Mode">
        <Box
          onClick={() => onChange('artist')}
          sx={{
            flex: 1,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography
            fontSize={FONT_SIZE}
            fontWeight={isArtist ? 800 : 500}
            color={isArtist ? 'white' : 'text.disabled'}
          >
            Artist
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
}
