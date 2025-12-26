import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function LyricsViewer({ lyrics }: { lyrics: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        maxHeight: { xs: '65vh', md: 500 },
        overflowY: 'auto',
        bgcolor: 'background.default',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          whiteSpace: 'pre-wrap', // keep line breaks
          lineHeight: 2.7,
          // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        }}
      >
        {lyrics}
      </Typography>
    </Paper>
  );
}
