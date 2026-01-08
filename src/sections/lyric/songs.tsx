import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';

// import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { LyricItem } from '../components/lyric-item';
import { LyricHeader } from '../components/lyric-header';

import type { LyricItemProps } from '../components/lyric-item';
// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  sub?: string;
  list: LyricItemProps[];
  loadMore?: React.ReactNode;
};

export function Songs({ title, subheader, sub, list, loadMore, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader
        title={<LyricHeader title={title} sub={sub} search />}
        subheader={subheader}
        sx={{ mb: 1 }}
      />

      <Scrollbar sx={{ minHeight: { xs: '77vh', md: '65vh' }, maxHeight: {xs: '77vh', md: '65vh' } }}>
        <Box sx={{ minWidth: { md: 640 } }}>
          {list.map((item) => (
            <LyricItem key={item.id} item={item} />
          ))}
        </Box>
        <Box>
          {loadMore}
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
