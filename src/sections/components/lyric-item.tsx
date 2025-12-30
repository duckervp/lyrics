import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useSmoothNavigate } from 'src/hooks/use-smooth-navigate';

import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export type LyricItemProps = {
  id: string;
  imageUrl: string;
  primary: string;
  primaryLink?: string;
  secondary: string;
  secondaryLink?: string;
  date: string;
};
// ----------------------------------------------------------------------

export function LyricItem({ sx, item, ...other }: BoxProps & { item: LyricItemProps }) {
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
        alt="avatar"
        src={item.imageUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={
          item.primaryLink ? (
            <Typography
              component="span"
              onClick={() => go(item.primaryLink!)}
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
                color: 'text.primary',
              }}
            >
              {item.primary}
            </Typography>
          ) : (
            item.primary
          )
        }
        secondary={
          item.secondaryLink ? (
            <Typography
              onClick={() => go(item.secondaryLink!)}
              variant="subtitle2"
              noWrap
              sx={{
                mt: 0.5,
                cursor: 'pointer',
                color: 'text.secondary',
                fontWeight: "regular"
              }}
            >
              {item.secondary}
            </Typography>
          ) : (
            item.secondary
          )
        }
      />

      {item.date && (
        <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
          {fToNow(item.date)}
        </Box>
      )}
    </Box>
  );
}
