import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useSmoothNavigate } from 'src/hooks/use-smooth-navigate';

import { Searchbar } from 'src/layouts/components/searchbar';

import { Iconify } from 'src/components/iconify';
// ----------------------------------------------------------------------

type TitleProps = {
  title?: string;
  sub?: string;
  search?: boolean;
};

export function LyricHeader({ title, sub, search }: TitleProps) {
  const go = useSmoothNavigate();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="baseline" justifyContent="start" spacing={0.5}>
        <Typography variant="h4" onClick={() => go('/')} sx={{ cursor: 'pointer' }}>
          {title}
        </Typography>
        {sub && <Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        <Typography variant="h5">{sub}</Typography>
      </Stack>

      {search && <Searchbar />}
    </Stack>
  );
}
