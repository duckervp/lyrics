import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useSmoothNavigate } from 'src/hooks/use-smooth-navigate';

type IosBackButtonProps = {
  label: string;
};

export default function IosBackButton({ label = 'Back' }: IosBackButtonProps) {
  const navigate = useSmoothNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.2}
      onClick={() => navigate(-1)}
      sx={{
        cursor: 'pointer',
        // color: 'primary.main',
        color: 'black',
        width: 'fit-content',
        userSelect: 'none',
      }}
    >
      <IconButton>
        <ChevronLeftIcon sx={{ fontSize: 24, mb: '1px' }} />
      </IconButton>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          letterSpacing: 0.1,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
