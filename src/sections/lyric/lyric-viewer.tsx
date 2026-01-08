import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function LyricsViewer({ lyrics }: { lyrics: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: 'background.default',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Divider variant="middle" sx={{ mb: 1 }}>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Lyrics
        </Typography>
      </Divider>
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
